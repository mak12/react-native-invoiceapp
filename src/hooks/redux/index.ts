import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootState} from '@redux/reducer';
import type {AppDispatch} from '@redux/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
