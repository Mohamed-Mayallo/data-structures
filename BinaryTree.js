class BinaryNode {
  key = null;
  left = null;
  right = null;

  constructor(key) {
    this.key = key;
  }

  addLeft(key) {
    const node = new BinaryNode(key);
    this.left = node;
    return node;
  }

  addRight(key) {
    const node = new BinaryNode(key);
    this.right = node;
    return node;
  }
}

class BinaryTree {
  root = null;

  constructor(key) {
    this.root = new BinaryNode(key);
  }

  traverse(node, visitFn, type = "in-order") {
    if (!node) return;

    if (type === "pre-order") visitFn(node);
    this.traverse(node.left, visitFn, type);
    if (type === "in-order") visitFn(node);
    this.traverse(node.right, visitFn, type);
    if (type === "post-order") visitFn(node);
  }

  print(type = "in-order") {
    let result = "";
    let visitedFn = (node) =>
      (result += !result.length ? node.key : ` => ${node.key} `);
    this.traverse(this.root, visitedFn, type);
    console.log(result);
  }

  find(key) {
    let currentNode = this.root;
    while (currentNode) {
      if (key === currentNode.key) return true;
      if (key > currentNode.key) currentNode = currentNode.right;
      if (key < currentNode.key) currentNode = currentNode.left;
    }
    return false;
  }

  insert(key) {
    let currentNode = this.root;
    while (currentNode) {
      if (key === currentNode.key) break;
      if (key > currentNode.key) {
        if (!currentNode.right) {
          currentNode.right = new BinaryNode(key);
          break;
        }
        currentNode = currentNode.right;
      }
      if (key < currentNode.key) {
        if (!currentNode.left) {
          currentNode.left = new BinaryNode(key);
          break;
        }
        currentNode = currentNode.left;
      }
    }
  }

  hight(node) {
    if (!node) return -1;
    if (this.isLeaf(node)) return 0;
    return 1 + Math.max(this.hight(node.left), this.hight(node.right));
  }

  isLeaf(node) {
    return !node.right && !node.left;
  }

  minTraverse(root) {
    if (this.isLeaf(root)) return root.key;
    const leftKey = this.minTraverse(root.left);
    const rightKey = this.minTraverse(root.right);
    return Math.min(Math.min(leftKey, rightKey), root.key);
  }

  min() {
    return this.minTraverse(this.root);
  }

  isEqualTraverse(node, otherNode) {
    if (!node && !otherNode) return true;
    if (
      node?.key === otherNode?.key &&
      this.isEqualTraverse(node.left, otherNode.left) &&
      this.isEqualTraverse(node.right, otherNode.right)
    )
      return true;
    return false;
  }

  isEqual(otherRoot) {
    if (!otherRoot) return false;
    return this.isEqualTraverse(this.root, otherRoot);
  }

  swapRoot() {
    const temp = this.root.left;
    this.root.left = this.root.right;
    this.root.right = temp;
  }

  isValidBSTTraverse(node, minValue, maxValue) {
    if (!node) return true;
    if (
      node.key > minValue &&
      node.key < maxValue &&
      this.isValidBSTTraverse(node.right, node.key, maxValue) &&
      this.isValidBSTTraverse(node.left, minValue, node.key)
    )
      return true;
    return false;
  }

  isValidBST() {
    return this.isValidBSTTraverse(this.root, -Infinity, Infinity);
  }

  nodesAtDistanceKFromRootTraverse(k, node, depth) {
    if (!node) return [];
    if (depth === k) return [node.key];
    return [
      ...this.nodesAtDistanceKFromRootTraverse(k, node.left, depth + 1),
      ...this.nodesAtDistanceKFromRootTraverse(k, node.right, depth + 1),
    ];
  }

  nodesAtDistanceKFromRoot(k) {
    return this.nodesAtDistanceKFromRootTraverse(k, this.root, 0);
  }

  traverseLevelOrder_bft() {
    for (let i = 0; i <= this.hight(this.root); i++)
      for (let nodeKey of this.nodesAtDistanceKFromRoot(i))
        console.log(nodeKey);
  }
}

const tree = new BinaryTree("a");
const b = tree.root.addLeft("b");
const c = tree.root.addRight("c");
const d = b.addLeft("d");
const e = b.addRight("e");
const f = c.addLeft("f");
const g = c.addRight("g");
const h = d.addLeft("h");
const i = d.addRight("i");

tree.print();

const t = new BinaryTree(7);
t.insert(4);
t.insert(9);
t.insert(1);
t.insert(6);
t.insert(8);
t.insert(10);

console.log(t.find(4));

t.print("in-order");
t.print("pre-order");
t.print("post-order");

console.log(t.hight(t.root));
console.log(t.min());

const t2 = new BinaryTree(7);
t2.insert(4);
t2.insert(9);
t2.insert(1);
t2.insert(6);
t2.insert(8);
t2.insert(10);

console.log(t2.isEqual(t.root));

console.log(t.isValidBST());
t2.swapRoot();
console.log(t2.isValidBST());

console.log(t2.nodesAtDistanceKFromRoot(2));

t.traverseLevelOrder_bft();
