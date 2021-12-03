import { MongoClient, ObjectId } from 'mongodb'
import log4js from 'log4js'

class Database {
    private static instance: Database
    private databaseClient: MongoClient
    private logger: log4js.Logger = log4js.getLogger('Database')

    public constructor(connectionURI?: string) {
        if (Database.instance) {
            throw new Error("ERROR: Instance of 'Database' already exists")
        }

        if (connectionURI === undefined) {
            throw new Error('ERROR: Connection URI may not be empty')
        }

        this.databaseClient = new MongoClient(connectionURI, {
            connectTimeoutMS: 10000,
            ignoreUndefined: false,
        })
        Database.instance = this
    }

    public static getInstance(): Database {
        return Database.instance
    }

    // Connects client to MongoDB cluster
    public async connect(): Promise<void> {
        try {
            await this.databaseClient.connect()
            this.logger.info('Successfully connected to MongoDB cluster')
        } catch(error: any) {
            this.logger.error(error.message)
        }
    }

    public async allDocuments() {
        // TODO: implement
    }

    public async getDocument(id: ObjectId) {
        // TODO: implement
    }

    public async updateDocument(id: ObjectId) {
        // TODO: implement
    }

    public async deleteDocument(id: ObjectId) {
        // TODO: implement
    }
}

export default Database