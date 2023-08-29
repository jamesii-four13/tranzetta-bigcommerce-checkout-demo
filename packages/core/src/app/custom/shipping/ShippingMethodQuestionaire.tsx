import React, { useEffect, useState } from 'react';

import { CheckoutContextProps } from '@bigcommerce/checkout/payment-integration-api';

import { withCheckout } from '../../checkout';

import InputForm from "./Form/Form";

const getCustomerMessage = (messages: string) => {
	const messageLines = messages.split('\n');
	const data: any = {};

	messageLines.forEach(line => {
		const [key, value] = line.split(':').map(item => item.trim());

		if (key) {
			data[key] = value;
		}
	});

	return data;
};

const PRODUCT_TYPE: any = {
	digital: 'digitalItems',
	giftCertificate: 'giftCertificates',
	customItems: 'customItems',
	physicalItems: 'physicalItems'
};

const combineMessage = (data: any) => {
	return Object.entries(data)
		.map(([key, value]) => `${key}: ${value}`)
		.join('\n')
		.trim();
};

const ShippingMethodQuestionaire = (props: any) => {
	console.log(props, 'PROPS')

	const [state, setState] = useState<any>(getCustomerMessage(props.checkout.customerMessage));

	const onStateChanged = async (e: any) => {
		const key = e.target.name;
		const value = e.target.value;

		setState({
			...state,
			[key] : value
		});
	};

	const addToCart = async ({ cartId, data } : { cartId: number; data: any }) => {
		const response = await fetch(`/api/storefront/carts/${cartId}/items`, {
			credentials: 'include',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		const responseData = await response.json();

		return responseData;
	};

	const removeItemCart = async ({ cartId, itemId } : { cartId: number; itemId: number }) => {
		const response = await fetch(`/api/storefront/carts/${cartId}/items/${itemId}`, {
			credentials: 'include',
			method: 'DELETE',
		});

		const responseData = await response.json();

		return responseData;
	};

	const updateCartItem = async({ cartId, itemId, data } : { cartId: number; itemId: number; data: any }) => {
		const response = await fetch(`/api/storefront/carts/${cartId}/items/${itemId}`, {
			credentials: 'include',
			method: 'PUT',
			body: JSON.stringify({ lineItem: data }),
		});

		const responseData = await response.json();

		return responseData;
	};

	const handleQuantity = async () => {
		const promises: Array<Promise<any>> = [];

		const _data: any = props.questions.filter((i: any) => !!i.productType);

		_data.forEach((i: any) => {
			if(i.productType && i.options) {
				i.options.filter((i: any) => i.productId).forEach((option: any) => {
					const _product = props.cart.lineItems[PRODUCT_TYPE[i.productType]].find(({ productId } : { productId: number }) => productId === Number(option.productId));

					if (_product && option.limit && _product.quantity > option.limit) {
						promises.push(updateCartItem({ 
							cartId: props.cart.id, 
							itemId: _product.id, 
							data: { 
								productId: Number(option.productId),
								quantity: 1
							} 
						}));
					}
				})
			}
		});
	
		if (promises.length) {
			try {
				await Promise.all(promises);
				await props.loadCheckout();
			} catch(err) {
				console.log('ERROR', err);
			}
		}
	};

	const updateCartSummary = async () => {
		const cart = props.cart;

		if (cart) {
			const promises: Array<Promise<any>> = [];

			for (const [key, value] of Object.entries(state)) {
				const _data = props.questions.find((i: any) => i._id === key);

				if (_data && !!_data.productType && _data.options) {
					const _option: any = _data.options.find((i: any) => i._id === value);

					if (_option) {
						const _product = cart.lineItems[PRODUCT_TYPE[_data.productType]].find(({ productId } : { productId: number }) => productId === Number(_option.productId));

						if (Number(_option.productId) && !_product) {
							promises.push(addToCart({ 
								cartId: cart.id, 
								data: { 
									lineItems: [{ 
										productId: Number(_option.productId), 
										quantity: _option.limit 
									}]
								}
							}));
						} else if(!Number(_option.productId)) {
							const productIdsToRemove = _data.options.filter((i: any) => i._id !== value).map((i: any) => Number(i.productId));
	
							productIdsToRemove.forEach((id: any) => {
								const __product = cart.lineItems[PRODUCT_TYPE[_data.productType]].find(({ productId } : { productId: number }) => productId === id);
								
								if (id && __product) {
									promises.push(removeItemCart({ 
										cartId: cart.id, 
										itemId: __product.id
									}));
								}
							})
						}
					}
				}
			}

			try {
				if (promises.length) {
					await Promise.all(promises);
				}
			} catch (error) {
				console.log(error, 'err')
			} finally {
				if (combineMessage(state) !== props.checkout.customerMessage) {
					await props.updateCheckout({
						customerMessage: combineMessage(state)
					});
				}

				await props.loadCheckout();
			}
		}
	};

	useEffect(() => {
		if (Object.keys(state).length) {
			updateCartSummary();		
		}
	}, [state])

	useEffect(() => {
		if (props.cart) {
			handleQuantity();
		}
	}, [props.cart.id])


	return <>
		<div id="freight-custom">
			{props.questions.map((i: any) => ( 
					<InputForm {...i} 
						key={i._id} 
						onChange={onStateChanged}
						value={state[i._id]} 
					/>
				))
			}
		</div>
	</>
}

export function mapToOrderConfirmationProps(
	context: CheckoutContextProps,
) {
	const {
		checkoutState: {
			data: { getConfig, getCart, getCheckout }
		},
		checkoutService,
	} = context;

	console.log(context, 'context');

	const config = getConfig();
	const checkout = getCheckout();
	const cart = getCart();

	return {
		config,
		cart,
		checkout,
		loadOrder: checkoutService.loadOrder,
		loadCheckout: checkoutService.loadCheckout,
		updateCheckout: checkoutService.updateCheckout
	};
}

export default withCheckout(mapToOrderConfirmationProps)(ShippingMethodQuestionaire);