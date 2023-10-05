export default {
    dateFormat: (d) => {
        const date = d.split('-')
        parseInt(date[2]) + 1
        date.join('-')
        return new Date(date)
    }
}