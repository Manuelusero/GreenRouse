const mongoose = require('mongoose');

// MongoDB URI directamente (reemplaza con tus credenciales)
const MONGODB_URI = 'mongodb+srv://manuelusero6_db_user:pRaPfBNwkqGDgp97@greenrouse.13p9ku9.mongodb.net/greenrouse?retryWrites=true&w=majority&appName=GreenRouse';

// Importar todos los modelos para que se registren
require('../src/models/Usuario');
require('../src/models/Parcela');
require('../src/models/Seguimiento');
require('../src/models/Onboarding');

async function initializeDatabase() {
    try {
        console.log('🔄 Conectando a MongoDB Atlas...');

        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI no está definida');
        }

        await mongoose.connect(MONGODB_URI);
        console.log('✅ Conectado a MongoDB Atlas exitosamente');

        // Obtener todos los modelos registrados
        const models = mongoose.modelNames();
        console.log('📋 Modelos encontrados:', models);

        // Crear índices para cada modelo
        for (const modelName of models) {
            try {
                const Model = mongoose.model(modelName);
                console.log(`🔄 Creando colección e índices para ${modelName}...`);

                // Esto creará la colección si no existe
                await Model.createCollection();

                // Crear los índices definidos en el esquema
                await Model.syncIndexes();

                console.log(`✅ Colección ${modelName} creada exitosamente`);
            } catch (error) {
                console.log(`⚠️  Colección ${modelName} ya existe o error:`, error.message);
            }
        }

        // Verificar que las colecciones existen
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('📊 Colecciones en la base de datos:');
        collections.forEach(collection => {
            console.log(`  - ${collection.name}`);
        });

        console.log('🎉 Base de datos inicializada correctamente');

    } catch (error) {
        console.error('❌ Error al inicializar la base de datos:', error);
    } finally {
        await mongoose.connection.close();
        console.log('📡 Conexión cerrada');
    }
}

// Ejecutar el script
initializeDatabase();