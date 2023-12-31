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

    //accepts value and returns node with given value
    find(value){
        let tmp = this.root;
        while (tmp !== null){
            if (value === tmp.value){
                return tmp;
            }
            if (value < tmp.value){
                tmp = tmp.left;
            }else if (value > tmp.value){
                tmp = tmp.right;
            }

        }
        console.log('value not found');
        return null;
    }

    //returns node and returns parent too (only used within delete fxn)
    findDelete(value){
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
        let tmpParent;
        let tmp = this.root;
    
        while(tmp !== null){
            tmpParent = tmp;
            if (value < tmp.value){
                tmp = tmp.left;
            }else{
                tmp = tmp.right;
            }
        }


        //create new node, assign value
        if (value < tmpParent.value){
            tmpParent.left = new Node(value);
        }else{
            tmpParent.right = new Node(value);
        }
    
    }

    delete(value){
        let [deleteNode, parentNode] = this.findDelete(value);

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

        //if node has one child, reset pointers so that deleteNode is skipped
        }else if (deleteNode.hasOneChild()){
            console.log('element has one child');

            if (parentNode.left === deleteNode){
                //if there is only one child, only deleteNode.left or right will be truthy
                parentNode.left = (deleteNode.left || deleteNode.right);                
            }else if (parentNode.right === deleteNode){
                parentNode.right = (deleteNode.left || deleteNode.right);                
            }
        }else{
            console.log('element has two children');
            let tmp = deleteNode.right;
            let tmpParent = {};

            //looking for last left leaf node
            //this must be next largest value after deleteNode
            while(tmp.left !== null){
                tmpParent = tmp;
                tmp = tmp.left;
            }

            //switcharoo of pointers
            //replacement Node's parent to point to replacement's child
            tmpParent.left = tmp.right;
            //set replacement children to deleteNode's former children
            tmp.right = deleteNode.right;
            tmp.left = deleteNode.left;

            //if deleteNode is root (i.e. parentNode value is undefined)
            //just set root to tmp
            if (parentNode.value === undefined){
                this.root = tmp;
            //otherwise, set deleteNode's parent pointer to replacement
            }else if (deleteNode.value < parentNode.value){
                parentNode.left = tmp;
            }else{
                parentNode.right = tmp;
            }
        }
    }

    levelOrder(callback){
        //initialize with tree root already pushed to queue
        let queue = [this.root];
        let outputArray = [];

        while (queue.length > 0){
            if (typeof callback === 'function'){
                outputArray.push(callback(queue[0].value));
            }else{
                outputArray.push(queue[0].value);
            }

            if (queue[0].left !== null){
                queue.push(queue[0].left);
            }

            if (queue[0].right !== null){
                queue.push(queue[0].right);
            }

            //remove first element which has already been added to outputArray
            queue.shift();
        };

        return outputArray;

    }

    preOrder(callback){
        let outputArray = [];
        let stack = [this.root];
        let tmp;

        while(stack.length > 0){
            tmp = stack[stack.length-1];
            stack.pop();

            if(typeof callback === 'function'){
                outputArray.push(callback(tmp.value));                
            }else{
                outputArray.push(tmp.value);
            }


            if (tmp.right !== null){
                stack.push(tmp.right);
            }

            if (tmp.left !== null){
                stack.push(tmp.left);
            }
        }

        return outputArray;

    }


    inOrder(callback){
        let outputArray = [];
        let tmp = this.root;
        let stack = [];

        while(true){
            if (tmp !== null){
                stack.push(tmp);
                tmp = tmp.left;

            }else{
                if (stack.length === 0){
                    break;
                }

                tmp = stack.pop();

                if(typeof callback === 'function'){
                    outputArray.push(callback(tmp.value));
                }else{
                    outputArray.push(tmp.value);
                }
                tmp = tmp.right;
            }
        }

        return outputArray;
    }

    postOrder(callback){
        let outputArray = [];
        let stack = [this.root];
        let stackFinal = [];
        let tmp;

        while(stack.length > 0){
            tmp = stack[stack.length-1];
            stack.pop();

            if(typeof callback === 'function'){
                outputArray.unshift(callback(tmp.value));                
            }else{
                outputArray.unshift(tmp.value);
            }

            if (tmp.left !== null){
                stack.push(tmp.left);
            }

            if (tmp.right !== null){
                stack.push(tmp.right);
            }
        }
        return outputArray;
    }

    height(node=this.root){
        if(node === null){
            return -1;
        }

        let heightLeft = this.height(node.left);
        let heightRight = this.height(node.right);

        if (heightLeft > heightRight){
            return heightLeft + 1;
        }else{
            return heightRight + 1;
        }
    }

    minHeight(node=this.root){
        if(node === null){
            return -1;
        }

        let heightLeft = this.minHeight(node.left);
        let heightRight = this.minHeight(node.right);

        if (heightLeft < heightRight){
            return heightLeft + 1;
        }else{
            return heightRight + 1;
        }
    }

    depth(node){
        let tmp = this.root;
        let count = 0;
        while (tmp !== null){
            if (node.value === tmp.value){
                return count;
            }
            if (node.value < tmp.value){
                tmp = tmp.left;
                count++;
            }else if (node.value > tmp.value){
                tmp = tmp.right;
                count++;
            }
        }
    }

    isBalanced(){
        return this.height() - this.minHeight() <= 1;
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

function rebalance(tree){
    let sortedArray = tree.inOrder();
    console.log(sortedArray);
    return buildTree(sortedArray);
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

function randArray(index){
    let randArr = [];
    for (let i = 0; i < index; i++){
        randArr.push(Math.floor(100*Math.random()));
    }

    return randArr;
}


// DRIVER SCRIPT
//input array
let userArray = randArray(20);
//create tree
let userTree = new Tree(userArray);
//set tree root to output of build tree (0th level root)
userTree.root = buildTree(userTree.array);

prettyPrint(userTree.root);
console.log(userTree.isBalanced());
console.log(userTree.levelOrder());
console.log(userTree.preOrder());
console.log(userTree.postOrder());
console.log(userTree.inOrder());

for (let i = 0; i < 10; i++){
    userTree.insert(Math.floor(Math.random() * 10000)+ 100);
}

prettyPrint(userTree.root);

console.log(userTree.isBalanced());

userTree.root = rebalance(userTree);
prettyPrint(userTree.root);
console.log(userTree.isBalanced());

console.log(userTree.levelOrder());
console.log(userTree.preOrder());
console.log(userTree.postOrder());
console.log(userTree.inOrder());



