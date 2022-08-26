declare global {
    interface String {
        asPhoneNumber(): string

        asNameAbbreviation(): string

        capitalize(): string
    }
}

// eslint-disable-next-line no-extend-native
String.prototype.asPhoneNumber = function () {
    const cleaned = ('' + this as string).replace(/\D/g, '')
    const match = cleaned.match(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/)
    if (match) {
        return '+' + match[1] + ' (' + match[2] + ') ' + match[3] + ' ' + match[4] + match[5]
    }
    return this as string
}

// eslint-disable-next-line no-extend-native
String.prototype.asNameAbbreviation = function (): string {
    const splitNames = this.trim().split(' ')
    const abbreviations = splitNames.slice(1).map(str => str.charAt(0) + '.').join(' ')
    if (splitNames.length > 1) {
        return (splitNames[0] + ' ' + abbreviations)
    }
    return splitNames[0]
}

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function (): string {
    return this.trim().substring(0, 1).toUpperCase() + this.trim().substring(1).toLowerCase()
}

export {}