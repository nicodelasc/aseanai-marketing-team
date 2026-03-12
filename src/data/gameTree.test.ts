import { describe, expect, it } from 'vitest';
import { gameTree, START_NODE_ID, type NodeId } from './gameTree';
import { collectReachableNodes } from './treeUtils';

describe('gameTree integrity', () => {
  it('resolves every nextId to a node', () => {
    Object.values(gameTree).forEach((node) => {
      if (node.type === 'question') {
        node.options.forEach((option) => {
          expect(gameTree[option.nextId]).toBeDefined();
        });
      }
    });
  });

  it('does not contain dead-end question nodes', () => {
    Object.values(gameTree).forEach((node) => {
      if (node.type === 'question') {
        expect(node.options.length).toBeGreaterThan(0);
      }
    });
  });

  it('reaches exactly seven result nodes from the start node', () => {
    const reachableNodes = collectReachableNodes(START_NODE_ID);
    const reachableResults = [...reachableNodes].filter((nodeId) => gameTree[nodeId].type === 'result');

    expect(reachableResults).toHaveLength(7);
  });

  it('does not contain unreachable nodes', () => {
    const reachableNodes = collectReachableNodes(START_NODE_ID);
    const allNodes = new Set(Object.keys(gameTree) as NodeId[]);

    expect(reachableNodes).toEqual(allNodes);
  });
});
