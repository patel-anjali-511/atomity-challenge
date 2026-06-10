import { useQuery } from '@tanstack/react-query';

export interface Workload {
  id: number;
  name: string;
  category: 'aws' | 'azure' | 'gcp' | 'on-premise';
  status: 'optimized' | 'over-provisioned';
  todoTitle: string;
  metrics: {
    cpuUsage: string;
    cpuRequest: string;
    memoryUsage: string;
    memoryRequest: string;
    estimatedSavings: number;
  };
}


const mapTodoToWorkload = (todo: any, index: number): Workload => {
  const categories: Workload['category'][] = ['aws', 'azure', 'gcp', 'on-premise'];
  const category = categories[index % 4];


  const serviceNames = [
    'auth-api', 'payment-gateway', 'users-db', 'search-index',
    'notification-service', 'analytics-pipeline', 'media-transcoder', 'cache-redis',
    'frontend-server', 'recommendation-engine', 'inventory-service', 'logging-daemon',
    'ingress-controller', 'reporting-worker', 'cron-scheduler', 'image-optimizer'
  ];
  const name = serviceNames[index % serviceNames.length];
  const status = todo.completed ? 'optimized' : 'over-provisioned';


  const cpuUsage = Math.floor(20 + (todo.id * 17) % 200);
  const cpuRequest = Math.floor(400 + (todo.id * 31) % 800);

  const memoryUsage = Math.floor(100 + (todo.id * 23) % 900);
  const memoryRequest = Math.floor(2 + (todo.id * 7) % 6);


  const estimatedSavings = status === 'over-provisioned'
    ? parseFloat((15 + (todo.id * 13.75) % 350).toFixed(2))
    : 0;

  return {
    id: todo.id,
    name,
    category,
    status,
    todoTitle: todo.title,
    metrics: {
      cpuUsage: `${cpuUsage}m`,
      cpuRequest: `${cpuRequest}m`,
      memoryUsage: `${memoryUsage} MiB`,
      memoryRequest: `${memoryRequest} GiB`,
      estimatedSavings,
    }
  };
};

const fetchWorkloads = async (): Promise<Workload[]> => {

  await new Promise((resolve) => setTimeout(resolve, 1200));

  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (!response.ok) {
    throw new Error('Failed to fetch workload data from public API');
  }
  const data = await response.json();


  return data.slice(0, 16).map((todo: any, idx: number) => mapTodoToWorkload(todo, idx));
};

export const useWorkloadData = () => {
  return useQuery<Workload[], Error>({
    queryKey: ['workloads'],
    queryFn: fetchWorkloads,

    staleTime: 1000 * 60 * 5,
  });
};
