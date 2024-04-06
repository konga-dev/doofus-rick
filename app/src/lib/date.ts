export const getAnniversaryYears = (created: Date) => {
    const today = new Date()
    if (created.getDate() === today.getDate() && created.getMonth() === today.getMonth()) {
        return today.getFullYear() - created.getFullYear()
    }
    return null
}

export const formatDate = (date: Date) => {
    return date.toLocaleDateString('de-AT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}
