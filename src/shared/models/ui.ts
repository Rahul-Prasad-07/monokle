import {Project, SavedCommand, SettingsPanel} from './config';
import {ResourceIdentifier} from './k8sResource';

export type StartPageMenuOptions =
  | 'recent-projects'
  | 'all-projects'
  | 'settings'
  | 'new-project'
  | 'quick-cluster-mode'
  | 'learn';

export enum HighlightItems {
  CLUSTER_PANE_ICON = 'CLUSTER_PANE_ICON',
  CREATE_RESOURCE = 'CREATE_RESOURCE',
  BROWSE_TEMPLATES = 'BROWSE_TEMPLATES',
  CONNECT_TO_CLUSTER = 'CONNECT_TO_CLUSTER',
}

type LayoutSizeType = {
  header: number;
};

type LeftMenuBottomSelectionType = 'terminal';

type MonacoRange = {
  startLineNumber: number;
  endLineNumber: number;
  startColumn: number;
  endColumn: number;
};

type MonacoSelectionFile = {
  type: 'file';
  filePath: string;
  range: MonacoRange;
};

type MonacoSelectionResource = {
  type: 'resource';
  resourceId: string;
  range: MonacoRange;
};

type MonacoUiSelection = MonacoSelectionResource | MonacoSelectionFile;

type MonacoUiState = {
  focused: boolean;
  undo: boolean;
  redo: boolean;
  find: boolean;
  replace: boolean;
  apply: boolean;
  diff: boolean;
  selection?: MonacoUiSelection;
};

type NewResourceWizardInput = {
  name?: string;
  kind?: string;
  apiVersion?: string;
  namespace?: string;
  selectedResourceId?: string;
  targetFolder?: string;
  targetFile?: string;
};

export const LeftMenuSelectionOptions = [
  'explorer',
  'compare',
  'validation',
  'git',
  'search',
  'settings',
  'dashboard',
] as const;
type LeftMenuSelectionType = typeof LeftMenuSelectionOptions[number];

type PaneConfiguration = {
  leftPane: number;
  navPane: number;
  editPane: number;
  bottomPaneHeight: number;
  recentProjectsPaneWidth: number;
};

type RightMenuSelectionType = 'logs' | 'graph';

type UiState = {
  isResourceFiltersOpen: boolean;
  isReleaseNotesDrawerOpen: boolean;
  isKeyboardShortcutsModalOpen: boolean;
  isScaleModalOpen: boolean;
  isNotificationsOpen: boolean;
  isAboutModalOpen: boolean;
  newResourceWizard: {
    isOpen: boolean;
    defaultInput?: NewResourceWizardInput;
  };
  createFileFolderModal: {
    isOpen: boolean;
    rootDir: string;
    type: 'file' | 'folder';
  };
  createProjectModal: {
    isOpen: boolean;
    fromTemplate: boolean;
  };
  renameResourceModal?: {
    isOpen: boolean;
    resourceIdentifier: ResourceIdentifier;
  };
  replaceImageModal?: {
    isOpen: boolean;
    imageId: string;
  };
  saveEditCommandModal: {
    isOpen: boolean;
    command?: SavedCommand;
  };
  filtersPresetModal?: {
    isOpen: boolean;
    type: 'load' | 'save';
  };
  saveResourcesToFileFolderModal: {
    isOpen: boolean;
    resourcesIdentifiers: ResourceIdentifier[];
  };
  isStartProjectPaneVisible: boolean;
  renameEntityModal: {
    isOpen: boolean;
    entityName: string;
    absolutePathToEntity: string;
  };
  layoutSize: LayoutSizeType;
  isFolderLoading: boolean;
  leftMenu: {
    bottomSelection?: LeftMenuBottomSelectionType;
    expandedFolders: React.Key[];
    expandedSearchedFiles: React.Key[];
    isActive: boolean;
    isValidationDrawerVisible: boolean;
    selection: LeftMenuSelectionType;
    activeTab: string | null;
  };
  quickSearchActionsPopup: {
    isOpen: boolean;
  };
  rightMenu: {
    selection?: RightMenuSelectionType;
    isActive: boolean;
  };
  navPane: {
    collapsedNavSectionNames: string[];
  };
  folderExplorer: {
    isOpen: boolean;
  };
  kubeConfigBrowseSettings: {
    isOpen: boolean;
  };
  isActionsPaneFooterExpanded: boolean;
  monacoEditor: MonacoUiState;
  paneConfiguration: PaneConfiguration;
  resetLayout: boolean;
  highlightedItems: {
    clusterPaneIcon: boolean;
    createResource: boolean;
    browseTemplates: boolean;
    connectToCluster: boolean;
  };
  activeSettingsPanel: SettingsPanel;
  startPage: {
    selectedMenuOption: StartPageMenuOptions;
    learn: {
      isVisible: boolean;
      learnTopic?: LearnTopicType;
    };
  };
  templateExplorer: {
    isVisible: boolean;
    selectedTemplatePath?: string;
    projectCreate?: Project;
  };
  isInQuickClusterMode?: boolean;
  welcomePopup: {
    isVisible: boolean;
  };
};

type LearnTopicType = 'explore' | 'edit' | 'validate' | 'publish' | (string & {});

export type {
  LayoutSizeType,
  LeftMenuBottomSelectionType,
  MonacoRange,
  MonacoSelectionFile,
  MonacoSelectionResource,
  MonacoUiSelection,
  MonacoUiState,
  LeftMenuSelectionType,
  NewResourceWizardInput,
  PaneConfiguration,
  RightMenuSelectionType,
  UiState,
  LearnTopicType,
};
