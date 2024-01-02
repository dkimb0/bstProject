class Node {
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }

    isLeafNode(){
        return this.left === null && this.right === null;
    }

    hasOneChild(){
        return Boolean(this.left) !== Boolean(this.right);
    }

    hasTwoChild(){
        return Boolean(this.left) && Boolean(this.right);
    }


}

class Tree {
    constructor(array){    
        this.array = array;
        this.root = null;
    }

    find(value){
        let tmp = this.root;
        let tmpParent = {};
        while (!tmp.isLeafNode()){
            if (value === tmp.value){
                return [tmp, tmpParent];
            }
            
            tmpParent = tmp;
            if (value < tmp.value){
                tmp = tmp.left;
            }else if (value > tmp.value){
                tmp = tmp.right;
            }

        }
        console.log('value not found');
        return null;

    }

    insert(value) {
        // traverse through tree, looking for last leaf (while left/right is not null)
        let tmp = this.root;
    
        while(!tmp.isLeafNode()){
            if (value < tmp.value){
                tmp = tmp.left;
            }else{
                tmp = tmp.right;
            }
        }


        //create new node, assign value
        if (value < tmp.value){
            tmp.left = new Node(value);
        }else{
            tmp.right = new Node(value);
        }
    
    }

    delete(value){
        let [deleteNode, parentNode] = this.find(value);
        
        console.log(deleteNode);
        console.log(parentNode);

        //if value is not in tree do nothing
        if (!deleteNode){
            return;
            //if node to delete is a leaf node, remove from parent
        }else if (deleteNode.isLeafNode()){
            console.log('element is leaf node');
            if (parentNode.left === deleteNode){
                parentNode.left = null;
            }else{
                parentNode.right = null;
            }
        }else if (deleteNode.hasOneChild()){
            console.log('element has one child');
            if (parentNode.left === deleteNode){
                parentNode.left = (deleteNode.left || deleteNode.right);                
            }
        }else{
            console.log('element has two children');
            let tmp = deleteNode.right;
            while(tmp.left !== null){
                tmp = tmp.left;
            }
            console.log(tmp);
        }






    }
}

// sorts and remove dupes of input array
// turns array into balanced binary tree of Node objects
// returns level-0 root node
// is there any way to put this in the tree class?
function buildTree(array){
    //init new root node
    let rootNode = new Node;

    //base case
    // add new nodes to make insert easier
    if (array.length === 1){
        rootNode.value = array[0];
        // rootNode.left = new Node;
        // rootNode.right = new Node
        return rootNode;
    }

    if (array.length < 1){
        return null;
    }

    //sort array
    let newArray = array.sort(function(a,b){return a - b});

    //remove duplicates
    newArray.forEach((item, i) => {
        while (newArray[i] === newArray[i+1]){
            newArray.splice(i+1, 1);
        }
    })

    //find halfway mark, set it to root node Value
    rootNode.value = newArray[Math.floor(newArray.length / 2)];

    //find left array, right array
    let leftArray = newArray.slice(0, newArray.length/2);
    let rightArray = newArray.slice(newArray.length/2 + 1, newArray.length);

    //recurse
    //set current layer root left/right values to the new roots
    //use bind? where is buildTree reference
    rootNode.left = buildTree(leftArray);
    // console.log(rootNode.left);
    // console.log(rightArray);
    rootNode.right = buildTree(rightArray);

    // console.log(newArray);   

    //return root node
    return rootNode;


    // console.log(rootNode.value);
    // console.log(leftArray);
    // console.log(rightArray);

}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    // console.log(node);
    // console.log(node.right);

    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

//input array
let userArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
//create tree
let userTree = new Tree(userArray);
//set tree root to output of build tree (0th level root)
userTree.root = buildTree(userTree.array);


userTree.insert(3650);
prettyPrint(userTree.root);
// userTree.insert(3652);
// userTree.delete(3);
// console.log(userTree.find(7));
userTree.delete(8);
prettyPrint(userTree.root);