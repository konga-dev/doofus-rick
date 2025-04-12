import type { ObjectId } from 'mongodb'

interface IModel {
	_id: ObjectId | null
}

export type { IModel }
