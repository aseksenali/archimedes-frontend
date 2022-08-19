export default class LinkedListNode<T> {
    public readonly value: T

    constructor(value: T, next?: LinkedListNode<T>) {
        this.value = value
        this._next = next
    }

    private _next: LinkedListNode<T> | undefined

    get next(): LinkedListNode<T> | undefined {
        return this._next
    }

    set next(value: LinkedListNode<T> | undefined) {
        this._next = value
    }

    toString(callback?: (value: T) => string) {
        return callback ? callback(this.value) : `${ this.value }`
    }
}