/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */

class Solution
{
public:
    int maxDepth(TreeNode *root)
    {
        struct type
        {
            TreeNode *treenode;
            int h;
        };
        if (!root)
            return 0;
        if (root->left == nullptr && root->right == nullptr)
            return 1;
        stack<type> stack;
        type t;
        t.treenode = root->right;
        t.h = 1;

        stack.push(t);
        t.treenode = root->left;
        t.h = 1 stack.push(t);

        int height = 0;
        int h1, h2;
        h1 = h2 = 0;
        while (!stack.empty())
        {
            type p, q;

            q = stack.top();
            stack.pop();
            p = stack.top();
            stack.pop();

            if (!p.treenode && !q.treenode)
                continue;
            if (q.treenode)
            {
                t.treenode = q.treenode->left;
                t.h = q.h + 1;

                stack.push(t);
            }
            if (p.treenode)
            {
                t.treenode = p.treenode->right;
                t.h = p.h + 1;
                stack.push(p.treenode->right);
            }
            if (q.treenode)
            {
                t.treenode = q.treenode->right;
                t.h = q.h + 1;
                stack.push(q.treenode->right);
            }
            if (p.treenode)
            {
                t.treenode = q.treenode->left;
                t.h = q.h + 1;
                stack.push(p.treenode->left);
            }
            height++;
        }
        return height;
    }
};