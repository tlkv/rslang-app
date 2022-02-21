export interface IWordOpt {
  difficulty?: string;
  optional?: {
    isLearned?: string;
    testValue?: number;
    sprintAttempts?: number;
    sprintSuccesful?: number;
    audioAttempts?: number;
    audioSuccesful?: number;
  };
}
