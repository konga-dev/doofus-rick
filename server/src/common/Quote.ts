import { ObjectId } from 'mongodb'
import { IModel } from './IModel'

/**
 * A quote which will make your heart beat faster
 *
 * Structure:
 * - id: ObjectId       # it is what it is
 * - content: string    # the actual content of this quote
 * - creator: string    # the creator of the quote (who added it to the database, = Discord ID)
 */
class Quote implements IModel {
    constructor(
        public readonly id: ObjectId,
        public content: string,
        public creator: string,
        public timestamp: number,
        public participants: Array<string> = [],
        public votes: number = 0
    ) {}
}

export { Quote }
