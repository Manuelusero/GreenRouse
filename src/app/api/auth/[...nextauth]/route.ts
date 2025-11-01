import NextAuth from 'next-auth'
import { AuthOptions } from 'next-auth'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import EmailProvider from 'next-auth/providers/email'
import GoogleProvider from 'next-auth/providers/google'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/mongodb'
import Usuario from '@/models/Usuario'
import { Resend } from 'resend'

const client = new MongoClient(process.env.MONGODB_URI!)
const clientPromise = client.connect()
const resend = new Resend(process.env.RESEND_API_KEY!)

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    EmailProvider({
      server: {
        host: 'smtp.resend.com',
        port: 587,
        auth: {
          user: 'resend',
          pass: process.env.RESEND_API_KEY,
        },
      },
      from: process.env.RESEND_FROM_EMAIL,
      sendVerificationRequest: async ({ identifier: email, url, provider, theme }) => {
        try {
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL!,
            to: [email],
            subject: '🌱 Bienvenido a GreenRouse - Confirma tu email',
            html: `
              <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background: #f8fdf8; padding: 40px 20px;">
                <div style="background: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                  <div style="text-align: center; margin-bottom: 30px;">
                    <div style="font-size: 48px; margin-bottom: 16px;">🌱</div>
                    <h1 style="color: #2d5016; margin: 0; font-size: 28px;">¡Bienvenido a GreenRouse!</h1>
                    <p style="color: #666; font-size: 16px; margin: 8px 0 0 0;">
                      Tu plataforma de agricultura orgánica
                    </p>
                  </div>
                  
                  <div style="background: #f0f9f0; border-radius: 8px; padding: 24px; margin: 24px 0; border-left: 4px solid #4CAF50;">
                    <p style="margin: 0 0 16px 0; color: #2d5016; font-size: 16px;">
                      Estás a un paso de comenzar tu viaje en la agricultura sostenible. 
                      Haz clic en el botón para confirmar tu cuenta:
                    </p>
                  </div>
                  
                  <div style="text-align: center; margin: 32px 0;">
                    <a href="${url}" 
                       style="background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); 
                              color: white; 
                              padding: 16px 32px; 
                              text-decoration: none; 
                              border-radius: 8px; 
                              font-weight: bold; 
                              font-size: 16px; 
                              display: inline-block;
                              box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);">
                      ✅ Confirmar mi email
                    </a>
                  </div>
                  
                  <div style="border-top: 1px solid #eee; padding-top: 24px; margin-top: 32px;">
                    <p style="color: #888; font-size: 14px; margin: 0; text-align: center;">
                      Este enlace expira en 24 horas. Si no creaste esta cuenta, puedes ignorar este email.
                    </p>
                  </div>
                  
                  <div style="text-align: center; margin-top: 24px;">
                    <p style="color: #4CAF50; font-size: 14px; margin: 0;">
                      🌿 Cultivemos un futuro sostenible juntos
                    </p>
                  </div>
                </div>
              </div>
            `,
            text: `¡Bienvenido a GreenRouse! 🌱\n\nConfirma tu email haciendo clic en este enlace:\n${url}\n\nEste enlace expira en 24 horas.\n\n¡Cultivemos un futuro sostenible juntos!`
          })
          
          console.log(`✅ Email de verificación enviado a: ${email}`)
        } catch (error) {
          console.error('❌ Error enviando email:', error)
          throw new Error('No se pudo enviar el email de verificación')
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        action: { label: 'Action', type: 'text' } // 'login' or 'register'
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email y contraseña son requeridos')
        }

        await connectDB()

        try {
          // Acción de registro
          if (credentials.action === 'register') {
            // Verificar si el usuario ya existe
            const existingUser = await Usuario.findOne({ 
              email: credentials.email.toLowerCase() 
            })
            
            if (existingUser) {
              throw new Error('Ya existe una cuenta con este email')
            }

            // Hash de la contraseña
            const hashedPassword = await bcrypt.hash(credentials.password, 12)

            // Crear nuevo usuario
            const newUser = await Usuario.create({
              email: credentials.email.toLowerCase(),
              nombre: credentials.email.split('@')[0], // Nombre temporal basado en email
              password: hashedPassword,
              experiencia: 'principiante',
              espacio: 'balcon',
              ubicacion: 'sol',
              objetivos: ['hobby'],
              tiempo: 'poco'
            })

            return {
              id: newUser._id.toString(),
              email: newUser.email,
              name: newUser.nombre,
              image: null
            }
          }
          
          // Acción de login
          else {
            const user = await Usuario.findOne({ 
              email: credentials.email.toLowerCase() 
            })

            if (!user || !user.password) {
              throw new Error('Credenciales inválidas')
            }

            const isValid = await bcrypt.compare(credentials.password, user.password)

            if (!isValid) {
              throw new Error('Credenciales inválidas')
            }

            return {
              id: user._id.toString(),
              email: user.email,
              name: user.nombre,
              image: user.avatar || null
            }
          }
        } catch (error: any) {
          console.error('Error en autenticación:', error)
          throw new Error(error.message || 'Error en autenticación')
        }
      }
    })
  ],
  
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 días
    updateAge: 24 * 60 * 60, // 24 horas
  },
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string
      }
      return session
    }
  },
  
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }