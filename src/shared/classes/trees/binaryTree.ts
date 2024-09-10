class BinaryTree {
  val: number;
  left: BinaryTree | null;
  right: BinaryTree | null;

  constructor(
    val: number,
    left: BinaryTree | null = null,
    right: BinaryTree | null = null
  ) {
    this.val = val;
    this.left = left;
    this.right = right;
  }

  static isEquals(p: BinaryTree | null, q: BinaryTree | null): boolean {
    if (p === null && q === null) return true;
    if (p === null || q === null || p.val !== q.val) return false;

    return (
      BinaryTree.isEquals(p.left, q.left) &&
      BinaryTree.isEquals(p.right, q.right)
    );
  }

  static toArray = (
    root: BinaryTree | null,
    mode: 'preserveOrder' | 'fast' = 'fast'
  ): number[] => {
    if (mode === 'preserveOrder') {
      if (!root) return [];
      const queue: (BinaryTree | null)[] = [root];
      const result: number[] = [];

      while (queue.length) {
        const current = queue.shift()!;
        if (current) {
          result.push(current.val);
          queue.push(current.left, current.right);
        }
      }

      return result;
    }

    // Mode 'fast' : Parcours en profondeur (DFS) pré-ordre
    if (!root) return [];
    return [
      root.val,
      ...BinaryTree.toArray(root?.left),
      ...BinaryTree.toArray(root?.right)
    ];
  };

  static arrayToBinaryTree(array: number[]): BinaryTree | null {
    if (!array.length) return null;

    const createTree = (index: number): BinaryTree | null => {
      if (index >= array.length) return null;

      const node = new BinaryTree(array[index]);
      node.left = createTree(2 * index + 1);
      node.right = createTree(2 * index + 2);

      return node;
    };

    return createTree(0);
  }

  static length(root: BinaryTree | null): number {
    if (root?.val === null || root?.val === undefined) return 0;

    return BinaryTree.length(root.left) + BinaryTree.length(root.right) + 1;
  }

  static depth(root: BinaryTree | null): number {
    return root === null
      ? 0
      : Math.max(BinaryTree.depth(root.left), BinaryTree.depth(root.right)) + 1;
  }

  static print(root: BinaryTree | null): void {
    if (root === null) {
      console.log('Empty tree');
      return;
    }

    const height = BinaryTree.depth(root); // Calculer la profondeur de l'arbre
    const printLevel = (
      nodes: (BinaryTree | null)[],
      level: number,
      maxDepth: number
    ) => {
      if (nodes.length === 0 || nodes.every(node => node === null)) return;

      const floor = maxDepth - level;
      const edgeLines = Math.pow(2, Math.max(floor - 1, 0));
      const firstSpaces = Math.pow(2, floor) - 1;
      const betweenSpaces = Math.pow(2, floor + 1) - 1;

      let line1 = ' '.repeat(firstSpaces);

      const newNodes: (BinaryTree | null)[] = [];

      nodes.forEach(node => {
        if (node !== null) {
          line1 += node.val.toString();
          newNodes.push(node.left, node.right);
        } else {
          line1 += ' ';
          newNodes.push(null, null);
        }
        line1 += ' '.repeat(betweenSpaces);
      });

      console.log(line1);

      if (level < maxDepth) {
        for (let i = 1; i <= edgeLines; i++) {
          let line = ' '.repeat(firstSpaces - i);
          nodes.forEach(node => {
            if (node === null) {
              line += ' '.repeat(edgeLines * 2 + i + 1);
            } else
              line += `${node.left ? '/' : ' '}${' '.repeat(i * 2 - 1)}${
                node.right ? '\\' : ' '
              }${' '.repeat(edgeLines * 2 - i)}`;
          });
          console.log(line);
        }
      }

      printLevel(newNodes, level + 1, maxDepth);
    };

    printLevel([root], 1, height);
  }

  static isLeaf(node: BinaryTree | null): boolean {
    return !node?.left && !node?.right;
  }

  static inverse(root: BinaryTree | null): BinaryTree | null {
    if (root === null) return null;

    const temp = root.left;
    root.left = root.right;
    root.right = temp;

    BinaryTree.inverse(root.left);
    BinaryTree.inverse(root.right);

    return root;
  }

  static isSymmetric(root: BinaryTree | null): boolean {
    if (root === null) return true;
    return BinaryTree.isMirror(root.left, root.right);
  }

  static isMirror(left: BinaryTree | null, right: BinaryTree | null): boolean {
    if (left === null && right === null) return true;
    if (left === null || right === null || left.val !== right.val) return false;

    return (
      BinaryTree.isMirror(left.left, right.right) &&
      BinaryTree.isMirror(left.right, right.left)
    );
  }
}
