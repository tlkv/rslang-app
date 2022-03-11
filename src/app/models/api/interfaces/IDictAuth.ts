import IDictCount from './IDictCount';
import IDictWord from './IDictWord';

interface IDictAuth {
  paginatedResults: IDictWord[];
  totalCount: IDictCount[];
}

export default IDictAuth;
