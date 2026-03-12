import { gameTree, type NodeId, type Option, type QuestionNode } from './gameTree';

export const getNode = (nodeId: NodeId) => gameTree[nodeId];

export const isQuestionNode = (nodeId: NodeId) => gameTree[nodeId].type === 'question';

export const deriveDecisionPath = (history: NodeId[]) => {
  const labels: string[] = [];

  history.forEach((nodeId, index) => {
    const nextNodeId = history[index + 1];

    if (!nextNodeId) {
      return;
    }

    const node = gameTree[nodeId];

    if (node.type !== 'question') {
      return;
    }

    const chosenOption = (node as QuestionNode).options.find(
      (option: Option) => option.nextId === nextNodeId
    );

    if (chosenOption) {
      labels.push(chosenOption.label);
    }
  });

  return labels;
};

export const collectReachableNodes = (startId: NodeId) => {
  const visited = new Set<NodeId>();
  const queue: NodeId[] = [startId];

  while (queue.length > 0) {
    const currentId = queue.shift();

    if (!currentId || visited.has(currentId)) {
      continue;
    }

    visited.add(currentId);

    const node = gameTree[currentId];

    if (node.type === 'question') {
      node.options.forEach((option) => queue.push(option.nextId));
    }
  }

  return visited;
};
