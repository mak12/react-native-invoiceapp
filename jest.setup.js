// Mocking AsyncStorage for Jest
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
jest.mock('react-redux', () => ({
  connect: () => jest.fn(),
  useSelector: jest.fn(fn => fn()),
  useDispatch: () => jest.fn(),
}));
