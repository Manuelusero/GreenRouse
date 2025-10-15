const mongoose = require('mongoose');

// MongoDB URI directamente
const MONGODB_URI = 'mongodb+srv://greenrouse_user:CTDdkJdIPBxbik6V@greenrouse.13p9ku9.mongodb.net/greenrouse?retryWrites=true&w=majority&appName=GreenRouse';

async function testConnection() {
    try {
        console.log('🔄 Probando conexión a MongoDB Atlas...');
        console.log('📍 URI:', MONGODB_URI.replace(/:[^:@]*@/, ':***@')); // Ocultar password

        await mongoose.connect(MONGODB_URI);
        console.log('✅ ¡Conexión exitosa a MongoDB Atlas!');

        // Listar bases de datos
        const admin = mongoose.connection.db.admin();
        const dbs = await admin.listDatabases();
        console.log('📊 Bases de datos disponibles:');
        dbs.databases.forEach(db => console.log(`  - ${db.name}`));

        // Verificar la base de datos actual
        const dbName = mongoose.connection.name;
        console.log(`📂 Base de datos actual: ${dbName}`);

        // Listar colecciones existentes
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('📋 Colecciones existentes:');
        if (collections.length === 0) {
            console.log('  ⚠️  No hay colecciones creadas aún');
        } else {
            collections.forEach(collection => {
                console.log(`  - ${collection.name}`);
            });
        }

        console.log('🎉 Prueba de conexión completada exitosamente');

    } catch (error) {
        console.error('❌ Error de conexión:', error.message);

        if (error.message.includes('bad auth')) {
            console.log('🔑 Sugerencias para resolver el error de autenticación:');
            console.log('   1. Verificar usuario y contraseña en MongoDB Atlas');
            console.log('   2. Asegurar que el usuario tiene permisos de lectura/escritura');
            console.log('   3. Verificar que la IP está en la lista blanca (0.0.0.0/0)');
        }
    } finally {
        await mongoose.connection.close();
        console.log('📡 Conexión cerrada');
    }
}

testConnection();