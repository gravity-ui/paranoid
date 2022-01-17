import {
  Link,
  GraphNode,
  ExplainPlanNodeData,
  TopologyNodeDataStats,
  TopologyNodeDataStatsSection,
} from "../../../lib";

interface PlanOperator {
  Name: string;
  [key: string]: any;
}

export interface Plan {
  PlanNodeId: number;
  "Node Type": string;
  Plans?: Plan[];
  Operators?: PlanOperator[];
  Tables?: string[];
  PlanNodeType?: string;
  [key: string]: any;
}

export interface RootPlan {
  Plan: Plan;
}

function prepareStats(plan: Plan) {
  const stats: TopologyNodeDataStats[] = [];

  if (plan.Operators) {
    const operatorsSections: TopologyNodeDataStatsSection[] = [];

    for (const operator of plan.Operators) {
      const section: TopologyNodeDataStatsSection = {
        name: operator.Name,
        items: [],
      };

      for (const [name, data] of Object.entries(operator)) {
        if (name === "Name") {
          continue;
        }

        const value = Array.isArray(data) ? data.join(", ") : data;
        section.items.push({ name, value });
      }

      operatorsSections.push(section);
    }

    stats.push({
      group: "Operators",
      stats: operatorsSections,
    });
  }

  return stats;
}

export function parseExplain(explain: RootPlan) {
  const nodes: GraphNode[] = [];
  const links: Link[] = [];

  function parsePlans(plans: Plan[] = [], from: string) {
    plans.forEach((p) => {
      const node: GraphNode<ExplainPlanNodeData> = {
        name: String(p.PlanNodeId),
        data: {
          id: p.PlanNodeId,
          type: p.PlanNodeType === "Connection" ? "connection" : "stage",
          name: p["Node Type"],
          operators: p.Operators?.map((o) => o.Name),
          stats: prepareStats(p),
          tables: p.Tables,
        },
      };
      nodes.push(node);
      links.push({ from, to: node.name });
      parsePlans(p.Plans, node.name);
    });
  }

  const rootPlan = explain.Plan;
  const rootNode: GraphNode<ExplainPlanNodeData> = {
    name: String(rootPlan.PlanNodeId),
    data: {
      id: rootPlan.PlanNodeId,
      type: "stage",
      name: rootPlan["Node Type"],
    },
  };
  nodes.push(rootNode);
  parsePlans(rootPlan.Plans, rootNode.name);

  return {
    nodes,
    links,
  };
}