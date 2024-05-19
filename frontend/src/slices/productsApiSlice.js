import apiSlice from './apiSlice';
import { PRODUCTS_URL, UPLOAD_URL } from '../constants';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({keyword}) => ({
                url: PRODUCTS_URL,
                params: {
                    keyword
                }
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        getAllProducts: builder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST',
            }),
            invalidatesTags: ['Product'],
        }),
        copyProduct: builder.mutation({
            query: (productId) => ({
                url: PRODUCTS_URL,
                method: 'POST',
                params: { copy: true, productId },
            }),
            invalidatesTags: ['Products'],
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Products'],
        }),
        uploadProductImage: builder.mutation({
            query: (images) => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: images,
            }),
        }),
        
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
            }),
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data  
            }),
            invalidatesTags: ['Product'],
        }),
        getTopProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/top`,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const { useGetProductsQuery } = productsApiSlice;
export const { useGetAllProductsQuery } = productsApiSlice;
export const { useGetProductDetailsQuery } = productsApiSlice;
export const { useCreateProductMutation } = productsApiSlice;
export const { useUpdateProductMutation } = productsApiSlice;
export const { useUploadProductImageMutation } = productsApiSlice;
export const { useDeleteProductMutation } = productsApiSlice;
export const { useCreateReviewMutation } = productsApiSlice;
export const { useGetTopProductsQuery } = productsApiSlice;
export const { useCopyProductMutation } = productsApiSlice;