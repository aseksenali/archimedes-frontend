import LinkedList from './LinkedList'

const defaultHashTableSize = 32

type KeyType = {
    [key: string]: number
}

type Entry<K, V> = {
    key: K
    value: V
}

export default class HashTable<V> {
    private readonly buckets: LinkedList<Entry<string, V>>[]
    private readonly keys: KeyType


    constructor(hashTableSize = defaultHashTableSize) {
        // Create hash table of certain size and fill each bucket with empty linked list.
        this.buckets = Array(hashTableSize).fill(null).map(() => new LinkedList<Entry<string, V>>())

        // Just to keep track of all actual keys in a fast way.
        this.keys = {}
    }

    hash(key: string) {
        // For simplicity reasons we will just use character codes sum of all characters of the key
        // to calculate the hash.
        //
        // But you may also use more sophisticated approaches like polynomial string hash to reduce the
        // number of collisions:
        //
        // hash = charCodeAt(0) * PRIME^(n-1) + charCodeAt(1) * PRIME^(n-2) + ... + charCodeAt(n-1)
        //
        // where charCodeAt(i) is the i-th character code of the key, n is the length of the key and
        const hash = Array.from(key).reduce(
            (hashAccumulator, keySymbol) => (hashAccumulator + keySymbol.charCodeAt(0)),
            0,
        )

        // Reduce hash number, so it would fit hash table size.
        return hash % this.buckets.length
    }

    set(key: string, value: V) {
        const keyHash = this.hash(key)
        this.keys[key] = keyHash
        const bucketLinkedList = this.buckets[keyHash]
        const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key })

        if (!node) {
            // Insert new node.
            bucketLinkedList.append({ key, value })
        } else {
            // Update value of existing node.
            node.value.value = value
        }
    }

    /**
     * @param {string} key
     * @return {*}
     */
    delete(key: string) {
        const keyHash = this.hash(key)
        delete this.keys[key]
        const bucketLinkedList = this.buckets[keyHash]
        const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key })

        if (node) {
            return bucketLinkedList.delete(node.value)
        }

        return null
    }

    /**
     * @param {string} key
     * @return {*}
     */
    get(key: string) {
        const bucketLinkedList = this.buckets[this.hash(key)]
        const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key })

        return node ? node.value.value : undefined
    }

    /**
     * @param {string} key
     * @return {boolean}
     */
    has(key: string) {
        return Object.hasOwnProperty.call(this.keys, key)
    }

    /**
     * @return {string[]}
     */
    getKeys() {
        return Object.keys(this.keys)
    }

    /**
     * Gets the list of all the stored values in the hash table.
     *
     * @return {*[]}
     */
    getValues() {
        return this.buckets.reduce((values, bucket) => {
            const bucketValues = bucket.toArray()
                .map((linkedListNode) => linkedListNode.value.value)
            return values.concat(bucketValues)
        }, [] as Array<V>)
    }
}