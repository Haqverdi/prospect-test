import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';

registerScreens();

// loading screen
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'TaskList',
              options: {
                topBar: {
                  hideOnScroll: true,
                  title: {
                    text: 'Tapşırıqlar',
                    component: {
                      alignment: 'center',
                      name: 'HeaderComponent',
                      passProps: {
                        text: 'Tapşırıqlar',
                      },
                    },
                  },
                },
              },
            },
          },
        ],
      },
    },
  });
});
