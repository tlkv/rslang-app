import FrontController from '../../../controllers/frontController/frontConroller';
import AuthorizationController from '../../../controllers/authorizationController/authorizationConroller';
import TextbookController from '../../../controllers/textbookController/textbookConroller';
import GameSprintController from '../../../controllers/gameSprintController/gameSprintConroller';
import GameAudioController from '../../../controllers/gameAudioController/gameAudioConroller';
import StatisticsController from '../../../controllers/statisticsController/statisticsConroller';
import TestController from '../../../controllers/testController/testConroller';

type IController =
  | FrontController
  | AuthorizationController
  | TextbookController
  | GameSprintController
  | GameAudioController
  | StatisticsController
  | TestController;

export default IController;
