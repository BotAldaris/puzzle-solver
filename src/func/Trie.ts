class Trie {
  private root = new Map();
  private end_symbol = "*";
  public total = 0;
  public add(nums: number[][]) {
    let current = this.root;
    nums.forEach((nums_l) => {
      nums_l.forEach((num) => {
        if (current.has(num)) {
          current = current.get(num);
        } else {
          current.set(num, new Map());
          current = current.get(num);
        }
      });
    });
    current.set(this.end_symbol, true);
    this.total++;
  }

  public exists(nums: number[][]) {
    let current = this.root;
    nums.forEach((nums_l) => {
      nums_l.forEach((num) => {
        if (current.has(num)) {
          current = current.get(num);
        } else {
          return false;
        }
      });
    });
    return current.has(this.end_symbol);
  }
}

export default Trie;
