export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function getTrackingUrl(orderId, productId) {
    const params = new URLSearchParams({ orderId, productId });
    return `tracking.html?${params.toString()}`;
}

export function getTrackedOrderProduct(savedOrders, orderId, productId) {
    const order = savedOrders.find((savedOrder) => savedOrder.id === orderId);
    const orderProduct = order?.products.find((product) =>
        product.productId === productId
    );

    return order && orderProduct ? { order, orderProduct } : null;
}

export function addOrder(order){
    orders.unshift(order);
    saveToStorage();
}
function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}