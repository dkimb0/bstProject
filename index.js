class Node {
    constructor(){
        this.value = null;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array){    
        this.array = array;
        this.root = null;
    }

    insert(value) {
        // traverse through tree, looking for last leaf (while left/right is not null)
        let tmp = this.root;
    
        while(tmp.value !== null){
            if (value < tmp.value){
                tmp = tmp.left;
            }else{
                tmp = tmp.right;
            }
        }

        //set up new leaf node
        tmp.value = value;
        tmp.left = new Node;
        tmp.right = new Node;
    }
}



// [DONE] takes input array
// [DONE] sorts 
// [DONE] removes duplicates
// [DONE] turns array into balanced binary tree of Node objects
// [DONE] returns level-0 root node
// is there any way to put this in the tree class?
// set up buildTree as a node func
function buildTree(array){
    //init new root node
    let rootNode = new Node;

    //base case
    // add new nodes to make insert easier
    if (array.length === 1){
        rootNode.value = array[0];
        rootNode.left = new Node;
        rootNode.right = new Node
        return rootNode;
    }

    if (array.length < 1){
        return rootNode;
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
prettyPrint(userTree.root);

// userTree.insert(3650);
// userTree.insert(3652);
