import itemSaga from './ItemSaga';
import orderSaga from './OrderSaga';
import userSaga from './UserSaga';

export default function* rootSaga() {
  yield* userSaga();
  yield* itemSaga();
  yield* orderSaga();
}
