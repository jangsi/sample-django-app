import ReactDOM from 'react-dom';
import createRoutes from './routes';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(createRoutes(), div);
  ReactDOM.unmountComponentAtNode(div);
});
