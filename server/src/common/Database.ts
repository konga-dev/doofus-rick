import log4js from 'log4js'
import {
    Db,
    DeleteResult,
    Filter,
    MongoClient,
    ObjectId,
    OptionalUnlessRequiredId,
    UpdateFilter,
    UpdateResult,
} from 'mongodb'
import { IModel } from './IModel'

class Database {
    private static instance: Database
    private client: MongoClient
    private database!: Db

    private logger: log4js.Logger = log4js.getLogger('Database')

    public constructor(mongodbURI: string) {
        if (Database.instance) {
            throw new Error(`ERROR: An instance of 'Database' has already been created.`)
        }

        if (mongodbURI === undefined) {
            throw new Error(`ERROR: No connection URI specified!\n
                Please check your 'MONGODB_URI' variable in the respective .env file.`)
        }

        // Initialise MongoDB client
        this.client = new MongoClient(mongodbURI, {
            connectTimeoutMS: 10000,
            ignoreUndefined: false,
        })

        Database.instance = this
    }

    public static getInstance(): Database {
        return Database.instance
    }

    /**
     * Connects client to MongoDB instance
     *
     * @param databaseName name of MongoDB database
     * @returns Promise<void>
     */
    public async connect(databaseName: string): Promise<void> {
        if (databaseName === undefined) {
            throw new Error(`ERROR: No database name specified!\n
                Please check your 'DATABASE' variable in the respective .env file.`)
        }

        try {
            // Connect client to MongoDB instance
            await this.client.connect()

            // Set database scope
            this.database = this.client.db(databaseName)
            this.logger.info(`Successfully connected to MongoDB instance, scope set to '${databaseName}'`)
        } catch (error: any) {
            this.logger.error(error.message)
        }
    }

    /**
     * Returns all existing documents in a collection
     *
     * @param collectionName name of the collection
     * @returns Promise<WithId<Document>[]>
     */
    public async all<T extends IModel>(collectionName: string): Promise<Array<T>> {
        if (!(await this.database.listCollections({ name: collectionName }).next())) {
            throw new Error(`ERROR: Specified collection '${collectionName}' does not exist!`)
        }
        return await this.database.collection<T>(collectionName).find<T>({}).toArray()
    }

    /**
     * Returns all documents that match the passed filter
     *
     * @param collectionName name of the collection
     * @param filter filter, used to seleect the documents to get
     * @returns Promise<WithId<Document>[]>
     */
    public async get<T extends IModel>(collectionName: string, filter: Filter<T>): Promise<Array<T>> {
        if (!(await this.database.listCollections({ name: collectionName }).next())) {
            throw new Error(`ERROR: Specified collection '${collectionName}' does not exist!`)
        }
        return await this.database.collection<T>(collectionName).find<T>(filter).toArray()
    }

    /**
     * Gets a random document from the collection
     *
     * @param collectionName name of the collection
     * @returns Promise<Document | null>
     */
    public async getRandom<T extends IModel>(collectionName: string): Promise<T | null> {
        if (!(await this.database.listCollections({ name: collectionName }).next())) {
            throw new Error(`ERROR: Specified collection '${collectionName}' does not exist!`)
        }
        return await this.database
            .collection<T>(collectionName)
            .aggregate<T>([{ $sample: { size: 1 } }])
            .next()
    }

    /**
     * Inserts a single document and returns the document's ObjectID
     *
     * @param collectionName name of the collection
     * @param document the document to be inserted
     * @returns Promise<ObjectId>
     */
    public async insert<T extends IModel>(collectionName: string, document: T): Promise<ObjectId> {
        if (!(await this.database.listCollections({ name: collectionName }).next())) {
            throw new Error(`ERROR: Specified collection '${collectionName}' does not exist!`)
        }
        return (await this.database.collection<T>(collectionName).insertOne(document as OptionalUnlessRequiredId<T>)).insertedId
    }

    /**
     * Updates all documents that match the passed filter with specified update operations
     * and returns the count of modified documents
     *
     * @param collectionName name of the collection
     * @param filter filter, used to select the documents to update
     * @param update operations to be applied to the documents
     * @returns Promise<number> modified count
     */
    public async update<T extends IModel>(collectionName: string, filter: Filter<T>, update: UpdateFilter<T>): Promise<UpdateResult> {
        if (!(await this.database.listCollections({ name: collectionName }).next())) {
            throw new Error(`ERROR: Specified collection '${collectionName}' does not exist!`)
        }
        return await this.database.collection<T>(collectionName).updateMany(filter, update)
    }

    /**
     * Deletes all documents that match the passed filter and returns the count of
     * deleted documents
     *
     * @param collectionName name of the collection
     * @param filter filter, used to select the documents to delete
     * @returns Promise<Number> deleted count
     */
    public async delete<T extends IModel>(collectionName: string, filter: Filter<T>): Promise<DeleteResult> {
        if (!(await this.database.listCollections({ name: collectionName }).next())) {
            throw new Error(`ERROR: Specified collection '${collectionName}' does not exist!`)
        }
        return await this.database.collection<T>(collectionName).deleteMany(filter)
    }
}

const database = new Database(process.env.MONGODB_URI)
export { Database, database }
