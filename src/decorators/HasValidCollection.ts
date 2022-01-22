import Database from '../Database'

const HasValidCollection = () => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const original: any = descriptor.value

        descriptor.value = async function (collectionName: string): Promise<void> {
            if (!(await Database.getInstance().getDatabase().listCollections({ name: collectionName }).next())) {
                throw new Error(`ERROR: Specified collection '${collectionName}' does not exist!`)
            }
            return original.bind(this)(collectionName)
        }
    }
}

export { HasValidCollection }
