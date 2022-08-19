import BinarySearchTreeNode from './BinarySearchTreeNode'
import Comparator from './Comparator'

export default class BinarySearchTree<T> {
    public root: BinarySearchTreeNode<T>
    private nodeComparator: Comparator<BinarySearchTreeNode<T>>

    constructor(nodeValueCompareFunction: (a: T, b: T) => number) {
        this.root = new BinarySearchTreeNode(undefined, nodeValueCompareFunction)

        // Steal node comparator from the root.
        this.nodeComparator = this.root.nodeComparator
    }

    insert(value: T) {
        if (this.root.value === undefined) {
            this.root.value = value
            return this.root
        }
        return this.root.insert(value)
    }

    contains(value: T) {
        return this.root.contains(value)
    }

    remove(value: T) {
        return this.root.remove(value)
    }

    toString() {
        return this.root.toString()
    }
}