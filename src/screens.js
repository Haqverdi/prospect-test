import { Navigation } from 'react-native-navigation';

//screens
import AddTask from './screens/AddTask';
import TaskList from './screens/TaskList';
import ViewTask from './screens/ViewTask';
import HeaderComponent from './components/HeaderComponent';

export function registerScreens() {
  Navigation.registerComponent('AddTask', () => AddTask);
  Navigation.registerComponent('TaskList', () => TaskList);
  Navigation.registerComponent('ViewTask', () => ViewTask);
  Navigation.registerComponent('HeaderComponent', () => HeaderComponent);
}
