interface IModel {
    /**
     * Inserts this object (if not present) into the database (and stores the ID)
     */
    create(): Promise<void>
    /**
     * Updates this object with the current fields in the database
     */
    update(): Promise<void>

    /**
     * Deletes this object from the database
     */
    delete(): Promise<void>
}

export { IModel }