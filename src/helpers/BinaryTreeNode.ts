import Comparator from './Comparator'
import HashTable from './HashTable'

type MetaInfo = {}

export default class BinaryTreeNode<T> {
    public value?: T
    nodeComparator: Comparator<BinaryTreeNode<T>>
    protected left?: BinaryTreeNode<T>
    protected right?: BinaryTreeNode<T>
    protected parent?: BinaryTreeNode<T>
    private meta: HashTable<MetaInfo>

    constructor(value?: T) {
        this.left = undefined
        this.right = undefined
        this.parent = undefined
        this.value = value

        // Any node related meta information may be stored here.
        this.meta = new HashTable()

        // This comparator is used to compare binary tree nodes with each other.
        this.nodeComparator = new Comparator()
    }

    get leftHeight(): number {
        if (!this.left) {
            return 0
        }

        return this.left.height + 1
    }

    get rightHeight(): number {
        if (!this.right) {
            return 0
        }

        return this.right.height + 1
    }

    get height() {
        return Math.max(this.leftHeight, this.rightHeight)
    }

    get balanceFactor() {
        return this.leftHeight - this.rightHeight
    }

    get uncle(): BinaryTreeNode<T> | undefined {
        // Check if current node has parent.
        if (!this.parent) {
            return undefined
        }

        // Check if current node has grandparent.
        if (!this.parent.parent) {
            return undefined
        }

        // Check if grandparent has two children.
        if (!this.parent.parent.left || !this.parent.parent.right) {
            return undefined
        }

        // So for now we know that current node has grandparent and this
        // grandparent has two children. Let's find out who is the uncle.
        if (this.nodeComparator.equal(this.parent, this.parent.parent.left)) {
            // Right one is an uncle.
            return this.parent.parent.right
        }

        // Left one is an uncle.
        return this.parent.parent.left
    }

    static copyNode<T>(sourceNode: BinaryTreeNode<T>, targetNode: BinaryTreeNode<T>) {
        targetNode.setValue(sourceNode.value)
        targetNode.setLeft(sourceNode.left)
        targetNode.setRight(sourceNode.right)
    }

    setValue(value?: T) {
        this.value = value

        return this
    }

    setLeft(node?: BinaryTreeNode<T>) {
        // Reset parent for left node since it is going to be detached.
        if (this.left) {
            this.left.parent = undefined
        }

        // Attach new node to the left.
        this.left = node

        // Make current node to be a parent for new left one.
        if (this.left) {
            this.left.parent = this
        }

        return this
    }

    setRight(node?: BinaryTreeNode<T>) {
        // Reset parent for right node since it is going to be detached.
        if (this.right) {
            this.right.parent = undefined
        }

        // Attach new node to the right.
        this.right = node

        // Make current node to be a parent for new right one.
        if (this.right) {
            this.right.parent = this
        }

        return this
    }

    removeChild(nodeToRemove: BinaryTreeNode<T>) {
        if (this.left && this.nodeComparator.equal(this.left, nodeToRemove)) {
            this.left = undefined
            return true
        }

        if (this.right && this.nodeComparator.equal(this.right, nodeToRemove)) {
            this.right = undefined
            return true
        }

        return false
    }

    replaceChild(nodeToReplace: BinaryTreeNode<T>, replacementNode: BinaryTreeNode<T>) {
        if (!nodeToReplace || !replacementNode) {
            return false
        }

        if (this.left && this.nodeComparator.equal(this.left, nodeToReplace)) {
            this.left = replacementNode
            return true
        }

        if (this.right && this.nodeComparator.equal(this.right, nodeToReplace)) {
            this.right = replacementNode
            return true
        }

        return false
    }

    public traverseInOrder(): Array<T> {
        let traverse = [] as Array<T>

        // Add left node.
        if (this.left) {
            traverse = traverse.concat(this.left.traverseInOrder())
        }

        // Add root.
        if (this.value)
            traverse.push(this.value)

        // Add right node.
        if (this.right) {
            traverse = traverse.concat(this.right.traverseInOrder())
        }

        return traverse
    }

    toString() {
        return this.traverseInOrder().toString()
    }
}