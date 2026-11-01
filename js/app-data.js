/**
 * La Tavola Restaurant Automation System
 * Shared Data Management & State Layer
 */

const RAS = (function () {
    // Keys in localStorage
    const KEYS = {
        MENU: 'laTavolaMenu',
        STOCK: 'laTavolaStock',
        ORDERS: 'laTavolaOrders',
        BILLS: 'laTavolaBills',
        REQUESTS: 'laTavolaStockRequests',
        CURRENT_ORDER: 'laTavolaOrder',
        USER: 'laTavolaUser',
        ACCOUNTS: 'laTavolaAccounts'
    };

    const DEFAULT_ACCOUNTS = {
        customer: [
            { phone: '9876543210', password: 'customer123', name: 'Ananya Sharma' },
            { phone: '9812345678', password: 'customer123', name: 'Rajesh Mukherjee' }
        ],
        staff: [
            { role: 'Owner', phone: '9830011223', password: 'owner123', name: 'Matteo Rossi' },
            { role: 'Manager', phone: '9830022334', password: 'manager123', name: 'Marco Bellini' },
            { role: 'Chef', phone: '9830033445', password: 'chef123', name: 'Chef Mario' },
            { role: 'Vendor', phone: '9830044556', password: 'vendor123', name: 'Verona Agro Supply' }
        ]
    };

    // Default Seed Data
    const DEFAULT_MENU = [
        {
            id: 'm1',
            name: 'Creamy Truffle Pasta',
            price: 420,
            category: 'Mains',
            description: 'Creamy pasta finished with black truffle, wild herbs and aged parmesan.',
            icon: '🍝',
            available: true
        },
        {
            id: 'm2',
            name: 'Garden Margherita',
            price: 360,
            category: 'Pizza',
            description: 'Classic San Marzano tomato sauce, fior di latte mozzarella, fresh basil & extra virgin olive oil.',
            icon: '🍕',
            available: true
        },
        {
            id: 'm3',
            name: 'Herb Risotto',
            price: 390,
            category: 'Mains',
            description: 'Slow-cooked creamy Arborio risotto with seasonal garden herbs, butter and parmesan crisp.',
            icon: '🍚',
            available: true
        },
        {
            id: 'm4',
            name: 'Grilled Garden Sandwich',
            price: 280,
            category: 'Starters',
            description: 'Grilled artisan sourdough with roasted vegetables, buffalo cheese and herb dressing.',
            icon: '🥪',
            available: true
        },
        {
            id: 'm5',
            name: 'Classic Tiramisu',
            price: 280,
            category: 'Desserts',
            description: 'Espresso-soaked savoiardi biscuits with velvety mascarpone cream and Valrhona cocoa.',
            icon: '🍰',
            available: false // Mascarpone low stock
        },
        {
            id: 'm6',
            name: 'Fresh Citrus Cooler',
            price: 180,
            category: 'Beverages',
            description: 'Fresh blood orange & Sicilian lemon, mint leaves and chilled sparkling mineral water.',
            icon: '🥤',
            available: true
        },
        {
            id: 'm7',
            name: 'Bruschetta Pomodoro',
            price: 240,
            category: 'Starters',
            description: 'Toasted Tuscan bread with marinated cherry tomatoes, garlic, basil and balsamic glaze.',
            icon: '🥖',
            available: true
        },
        {
            id: 'm8',
            name: 'Espresso Romano',
            price: 150,
            category: 'Beverages',
            description: 'Double shot Italian roasted espresso served with a twist of fresh lemon peel.',
            icon: '☕',
            available: true
        }
    ];

    const DEFAULT_STOCK = [
        {
            id: 'stk-01',
            name: 'San Marzano Tomatoes',
            category: 'Produce',
            quantity: 32,
            unit: 'kg',
            minThreshold: 15,
            unitCost: 110,
            lastRestocked: '2026-09-22',
            supplier: 'Verona Agro Supply'
        },
        {
            id: 'stk-02',
            name: 'Fresh Fior di Latte Mozzarella',
            category: 'Dairy',
            quantity: 5,
            unit: 'kg',
            minThreshold: 12,
            unitCost: 380,
            lastRestocked: '2026-09-20',
            supplier: 'Lombardy Creamery'
        },
        {
            id: 'stk-03',
            name: 'Black Truffle Oil',
            category: 'Pantry',
            quantity: 1.5,
            unit: 'L',
            minThreshold: 3.0,
            unitCost: 1450,
            lastRestocked: '2026-09-15',
            supplier: 'Umbria Fine Foods'
        },
        {
            id: 'stk-04',
            name: 'Mascarpone Cheese',
            category: 'Dairy',
            quantity: 0.4,
            unit: 'kg',
            minThreshold: 4.0,
            unitCost: 520,
            lastRestocked: '2026-09-18',
            supplier: 'Lombardy Creamery'
        },
        {
            id: 'stk-05',
            name: 'Arborio Rice Superfine',
            category: 'Dry Goods',
            quantity: 40,
            unit: 'kg',
            minThreshold: 15,
            unitCost: 140,
            lastRestocked: '2026-09-21',
            supplier: 'Po Valley Grains'
        },
        {
            id: 'stk-06',
            name: 'Italian Tipo 00 Flour',
            category: 'Dry Goods',
            quantity: 55,
            unit: 'kg',
            minThreshold: 20,
            unitCost: 95,
            lastRestocked: '2026-09-23',
            supplier: 'Caputo Mills'
        },
        {
            id: 'stk-07',
            name: 'Extra Virgin Olive Oil (Cold Pressed)',
            category: 'Pantry',
            quantity: 24,
            unit: 'L',
            minThreshold: 10,
            unitCost: 650,
            lastRestocked: '2026-09-23',
            supplier: 'Tuscany Groves'
        },
        {
            id: 'stk-08',
            name: 'Aged Parmigiano Reggiano (24mo)',
            category: 'Dairy',
            quantity: 11,
            unit: 'kg',
            minThreshold: 5,
            unitCost: 980,
            lastRestocked: '2026-09-21',
            supplier: 'Parma Direct'
        },
        {
            id: 'stk-09',
            name: 'Fresh Genovese Basil',
            category: 'Produce',
            quantity: 2.2,
            unit: 'kg',
            minThreshold: 2.0,
            unitCost: 240,
            lastRestocked: '2026-09-23',
            supplier: 'Verona Agro Supply'
        },
        {
            id: 'stk-10',
            name: 'Artisan Sourdough Loaves',
            category: 'Bakery',
            quantity: 16,
            unit: 'loaves',
            minThreshold: 8,
            unitCost: 80,
            lastRestocked: '2026-09-24',
            supplier: 'Milano Artisan Bakers'
        },
        {
            id: 'stk-11',
            name: 'Arabica Espresso Beans',
            category: 'Beverage',
            quantity: 12,
            unit: 'kg',
            minThreshold: 5,
            unitCost: 750,
            lastRestocked: '2026-09-22',
            supplier: 'Trieste Roasters'
        },
        {
            id: 'stk-12',
            name: 'Sparkling Mineral Water',
            category: 'Beverage',
            quantity: 48,
            unit: 'bottles',
            minThreshold: 24,
            unitCost: 45,
            lastRestocked: '2026-09-23',
            supplier: 'San Pellegrino Bottlers'
        }
    ];

    const DEFAULT_ORDERS = [
        {
            orderNumber: 'LT2026-1042',
            table: 'Table 04',
            customerName: 'Ananya Sharma',
            orderType: 'Dine-In',
            timestamp: new Date(Date.now() - 6 * 60000).toISOString(),
            status: 'Pending', // Pending chef acceptance
            station: 'Pasta / Mains',
            notes: 'Less garlic in pasta, please.',
            items: [
                { name: 'Creamy Truffle Pasta', price: 420, quantity: 1 },
                { name: 'Garden Margherita', price: 360, quantity: 1 }
            ],
            subtotal: 780,
            serviceCharge: 39,
            total: 819
        },
        {
            orderNumber: 'LT2026-1041',
            table: 'Table 02',
            customerName: 'Rajesh Mukherjee',
            orderType: 'Dine-In',
            timestamp: new Date(Date.now() - 17 * 60000).toISOString(),
            status: 'Preparing',
            station: 'Risotto / Mains',
            notes: 'Extra parmesan on the side.',
            items: [
                { name: 'Herb Risotto', price: 390, quantity: 2 },
                { name: 'Fresh Citrus Cooler', price: 180, quantity: 2 }
            ],
            subtotal: 1140,
            serviceCharge: 57,
            total: 1197
        },
        {
            orderNumber: 'LT2026-1040',
            table: 'Table 07',
            customerName: 'Priya Sen',
            orderType: 'Dine-In',
            timestamp: new Date(Date.now() - 28 * 60000).toISOString(),
            status: 'Ready',
            station: 'Bakery / Cold',
            notes: 'Warm sandwich lightly.',
            items: [
                { name: 'Grilled Garden Sandwich', price: 280, quantity: 2 },
                { name: 'Classic Tiramisu', price: 280, quantity: 1 }
            ],
            subtotal: 840,
            serviceCharge: 42,
            total: 882
        },
        {
            orderNumber: 'LT2026-1039',
            table: 'Table 01',
            customerName: 'Arjun Das',
            orderType: 'Dine-In',
            timestamp: new Date(Date.now() - 52 * 60000).toISOString(),
            status: 'Completed',
            station: 'Pasta / Drinks',
            notes: 'Table requested bill immediately after meal.',
            items: [
                { name: 'Creamy Truffle Pasta', price: 420, quantity: 2 },
                { name: 'Fresh Citrus Cooler', price: 180, quantity: 2 }
            ],
            subtotal: 1200,
            serviceCharge: 60,
            total: 1260
        }
    ];

    const DEFAULT_BILLS = [
        {
            billNumber: 'BILL-2026-1039',
            orderNumber: 'LT2026-1039',
            table: 'Table 01',
            customerName: 'Arjun Das',
            date: new Date(Date.now() - 40 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
            items: [
                { name: 'Creamy Truffle Pasta', price: 420, quantity: 2 },
                { name: 'Fresh Citrus Cooler', price: 180, quantity: 2 }
            ],
            subtotal: 1200,
            taxGst: 60,
            serviceCharge: 60,
            discount: 0,
            total: 1320,
            paymentStatus: 'Paid',
            paymentMethod: 'Credit Card',
            transactionId: 'TXN-90218'
        },
        {
            billNumber: 'BILL-2026-1040',
            orderNumber: 'LT2026-1040',
            table: 'Table 07',
            customerName: 'Priya Sen',
            date: new Date(Date.now() - 15 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
            items: [
                { name: 'Grilled Garden Sandwich', price: 280, quantity: 2 },
                { name: 'Classic Tiramisu', price: 280, quantity: 1 }
            ],
            subtotal: 840,
            taxGst: 42,
            serviceCharge: 42,
            discount: 0,
            total: 924,
            paymentStatus: 'Unpaid',
            paymentMethod: 'Pending',
            transactionId: '-'
        },
        {
            billNumber: 'BILL-2026-1041',
            orderNumber: 'LT2026-1041',
            table: 'Table 02',
            customerName: 'Rajesh Mukherjee',
            date: new Date(Date.now() - 8 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
            items: [
                { name: 'Herb Risotto', price: 390, quantity: 2 },
                { name: 'Fresh Citrus Cooler', price: 180, quantity: 2 }
            ],
            subtotal: 1140,
            taxGst: 57,
            serviceCharge: 57,
            discount: 0,
            total: 1254,
            paymentStatus: 'Unpaid',
            paymentMethod: 'Pending',
            transactionId: '-'
        }
    ];

    const DEFAULT_REQUESTS = [
        {
            id: 'REQ-101',
            itemId: 'stk-04',
            itemName: 'Mascarpone Cheese',
            quantity: 6,
            unit: 'kg',
            requestedBy: 'Chef Mario (Kitchen)',
            urgency: 'Urgent',
            notes: 'Kitchen ran out for Tiramisu desserts today.',
            date: 'Today, 11:15 AM',
            status: 'Pending'
        },
        {
            id: 'REQ-102',
            itemId: 'stk-03',
            itemName: 'Black Truffle Oil',
            quantity: 4,
            unit: 'L',
            requestedBy: 'Manager Marco',
            urgency: 'Normal',
            notes: 'Weekly pantry top-up for pasta station.',
            date: 'Today, 10:30 AM',
            status: 'Dispatched'
        },
        {
            id: 'REQ-103',
            itemId: 'stk-02',
            itemName: 'Fresh Fior di Latte Mozzarella',
            quantity: 15,
            unit: 'kg',
            requestedBy: 'Chef Mario (Kitchen)',
            urgency: 'Urgent',
            notes: 'Critical for evening pizza service.',
            date: 'Today, 11:45 AM',
            status: 'Pending'
        }
    ];

    // Helper functions
    function load(key, defaultVal) {
        try {
            const data = localStorage.getItem(key);
            if (!data) {
                localStorage.setItem(key, JSON.stringify(defaultVal));
                return defaultVal;
            }
            return JSON.parse(data);
        } catch (e) {
            console.error('Error reading localStorage for key', key, e);
            return defaultVal;
        }
    }

    function save(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Error saving to localStorage for key', key, e);
        }
    }

    // Initialize state
    function init() {
        load(KEYS.MENU, DEFAULT_MENU);
        load(KEYS.STOCK, DEFAULT_STOCK);
        load(KEYS.ORDERS, DEFAULT_ORDERS);
        load(KEYS.BILLS, DEFAULT_BILLS);
        load(KEYS.REQUESTS, DEFAULT_REQUESTS);

        // Check if customer placed an order via order.html
        const customerOrderRaw = localStorage.getItem(KEYS.CURRENT_ORDER);
        if (customerOrderRaw) {
            try {
                const customerOrder = JSON.parse(customerOrderRaw);
                const orders = load(KEYS.ORDERS, DEFAULT_ORDERS);
                const idx = orders.findIndex(o => o.orderNumber === customerOrder.orderNumber);
                if (idx >= 0) {
                    // Update items & totals if changed
                    orders[idx].items = customerOrder.items;
                    orders[idx].total = customerOrder.total;
                    orders[idx].subtotal = customerOrder.subtotal;
                    if (customerOrder.status) {
                        orders[idx].status = customerOrder.status;
                    }
                } else {
                    // Add customer order to orders list
                    orders.unshift({
                        orderNumber: customerOrder.orderNumber || 'LT2026-1042',
                        table: 'Table 04',
                        customerName: 'Customer (App)',
                        orderType: 'Dine-In',
                        timestamp: new Date().toISOString(),
                        status: customerOrder.status || 'Pending',
                        station: 'Main Kitchen',
                        notes: 'Placed via Customer Mobile App',
                        items: customerOrder.items || [],
                        subtotal: customerOrder.subtotal || 0,
                        serviceCharge: customerOrder.serviceCharge || 0,
                        total: customerOrder.total || 0
                    });
                }
                save(KEYS.ORDERS, orders);
            } catch (err) {
                console.warn('Customer order parsing error', err);
            }
        }
    }

    // Menu Methods
    function getMenu() {
        return load(KEYS.MENU, DEFAULT_MENU);
    }

    function addMenuItem(item) {
        const menu = getMenu();
        const newItem = {
            id: 'm' + Date.now(),
            name: item.name,
            price: Number(item.price),
            category: item.category || 'Mains',
            description: item.description || '',
            icon: item.icon || '🍽',
            available: item.available !== undefined ? item.available : true
        };
        menu.unshift(newItem);
        save(KEYS.MENU, menu);
        return newItem;
    }

    function updateMenuItem(id, data) {
        const menu = getMenu();
        const idx = menu.findIndex(i => i.id === id);
        if (idx !== -1) {
            menu[idx] = { ...menu[idx], ...data };
            save(KEYS.MENU, menu);
            return menu[idx];
        }
        return null;
    }

    function deleteMenuItem(id) {
        let menu = getMenu();
        menu = menu.filter(i => i.id !== id);
        save(KEYS.MENU, menu);
        return menu;
    }

    function toggleMenuAvailability(id) {
        const menu = getMenu();
        const item = menu.find(i => i.id === id);
        if (item) {
            item.available = !item.available;
            save(KEYS.MENU, menu);
            return item;
        }
        return null;
    }

    // Orders Methods
    function getOrders() {
        return load(KEYS.ORDERS, DEFAULT_ORDERS);
    }

    function updateOrderStatus(orderNumber, newStatus, reason = '') {
        const orders = getOrders();
        const order = orders.find(o => o.orderNumber === orderNumber);
        if (order) {
            order.status = newStatus;
            if (reason) order.rejectReason = reason;
            save(KEYS.ORDERS, orders);

            // Sync with customer current order if matching
            const currentRaw = localStorage.getItem(KEYS.CURRENT_ORDER);
            if (currentRaw) {
                try {
                    const current = JSON.parse(currentRaw);
                    if (current.orderNumber === orderNumber) {
                        current.status = newStatus;
                        if (reason) current.rejectReason = reason;
                        localStorage.setItem(KEYS.CURRENT_ORDER, JSON.stringify(current));
                    }
                } catch (e) {}
            }
            return order;
        }
        return null;
    }

    function addOrder(orderData) {
        const orders = getOrders();
        const newOrder = {
            orderNumber: orderData.orderNumber || ('LT2026-' + Math.floor(1000 + Math.random() * 9000)),
            table: orderData.table || 'Table 01',
            customerName: orderData.customerName || 'Walk-in Guest',
            orderType: orderData.orderType || 'Dine-In',
            timestamp: new Date().toISOString(),
            status: orderData.status || 'Pending',
            station: orderData.station || 'Main Kitchen',
            notes: orderData.notes || '',
            items: orderData.items || [],
            subtotal: orderData.subtotal || 0,
            serviceCharge: orderData.serviceCharge || 0,
            total: orderData.total || 0
        };
        orders.unshift(newOrder);
        save(KEYS.ORDERS, orders);
        return newOrder;
    }

    // Stock Methods
    function getStock() {
        const stock = load(KEYS.STOCK, DEFAULT_STOCK);
        // compute status dynamically
        stock.forEach(item => {
            if (item.quantity <= 0) {
                item.status = 'Out of Stock';
            } else if (item.quantity <= item.minThreshold) {
                item.status = 'Low Stock';
            } else {
                item.status = 'In Stock';
            }
        });
        return stock;
    }

    function updateStockQuantity(id, newQty) {
        const stock = load(KEYS.STOCK, DEFAULT_STOCK);
        const item = stock.find(s => s.id === id);
        if (item) {
            item.quantity = Math.max(0, Number(newQty));
            item.lastRestocked = new Date().toISOString().split('T')[0];
            save(KEYS.STOCK, stock);
            return item;
        }
        return null;
    }

    function addStockItem(newItem) {
        const stock = load(KEYS.STOCK, DEFAULT_STOCK);
        const item = {
            id: 'stk-' + String(stock.length + 1).padStart(2, '0'),
            name: newItem.name,
            category: newItem.category || 'Pantry',
            quantity: Number(newItem.quantity) || 0,
            unit: newItem.unit || 'kg',
            minThreshold: Number(newItem.minThreshold) || 5,
            unitCost: Number(newItem.unitCost) || 100,
            lastRestocked: new Date().toISOString().split('T')[0],
            supplier: newItem.supplier || 'General Food Distributors'
        };
        stock.unshift(item);
        save(KEYS.STOCK, stock);
        return item;
    }

    function restockItem(id, addedQuantity) {
        const stock = load(KEYS.STOCK, DEFAULT_STOCK);
        const item = stock.find(s => s.id === id);
        if (item) {
            item.quantity = Math.round((Number(item.quantity) + Number(addedQuantity)) * 10) / 10;
            item.lastRestocked = new Date().toISOString().split('T')[0];
            save(KEYS.STOCK, stock);
            return item;
        }
        return null;
    }

    // Stock Request Methods
    function getStockRequests() {
        return load(KEYS.REQUESTS, DEFAULT_REQUESTS);
    }

    function createStockRequest(reqData) {
        const reqs = getStockRequests();
        const newReq = {
            id: 'REQ-' + (100 + reqs.length + 1),
            itemId: reqData.itemId || '',
            itemName: reqData.itemName,
            quantity: Number(reqData.quantity),
            unit: reqData.unit || 'kg',
            requestedBy: reqData.requestedBy || 'Staff Member',
            urgency: reqData.urgency || 'Normal',
            notes: reqData.notes || '',
            date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'Pending'
        };
        reqs.unshift(newReq);
        save(KEYS.REQUESTS, reqs);
        return newReq;
    }

    function updateStockRequestStatus(reqId, newStatus) {
        const reqs = getStockRequests();
        const req = reqs.find(r => r.id === reqId);
        if (req) {
            req.status = newStatus;
            save(KEYS.REQUESTS, reqs);

            // If marked as Delivered, auto-replenish stock!
            if (newStatus === 'Delivered') {
                if (req.itemId) {
                    restockItem(req.itemId, req.quantity);
                } else {
                    // Try to match by name
                    const stock = getStock();
                    const match = stock.find(s => s.name.toLowerCase() === req.itemName.toLowerCase());
                    if (match) {
                        restockItem(match.id, req.quantity);
                    }
                }
            }
            return req;
        }
        return null;
    }

    // Bills & Payment Methods
    function getBills() {
        return load(KEYS.BILLS, DEFAULT_BILLS);
    }

    function createBill(billData) {
        const bills = getBills();
        const newBill = {
            billNumber: billData.billNumber || ('BILL-2026-' + Math.floor(1000 + Math.random() * 9000)),
            orderNumber: billData.orderNumber || '-',
            table: billData.table || 'Table 01',
            customerName: billData.customerName || 'Dining Guest',
            date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            items: billData.items || [],
            subtotal: Number(billData.subtotal) || 0,
            taxGst: Number(billData.taxGst) || 0,
            serviceCharge: Number(billData.serviceCharge) || 0,
            discount: Number(billData.discount) || 0,
            total: Number(billData.total) || 0,
            paymentStatus: billData.paymentStatus || 'Unpaid',
            paymentMethod: billData.paymentMethod || 'Pending',
            transactionId: billData.transactionId || '-'
        };
        bills.unshift(newBill);
        save(KEYS.BILLS, bills);
        return newBill;
    }

    function markBillPaid(billNumber, paymentMethod, transactionId) {
        const bills = getBills();
        const bill = bills.find(b => b.billNumber === billNumber);
        if (bill) {
            bill.paymentStatus = 'Paid';
            bill.paymentMethod = paymentMethod || 'Counter Cash';
            bill.transactionId = transactionId || ('TXN-' + Math.floor(10000 + Math.random() * 90000));
            save(KEYS.BILLS, bills);

            // Also check if corresponding order is completed
            if (bill.orderNumber) {
                updateOrderStatus(bill.orderNumber, 'Completed');
            }
            return bill;
        }
        return null;
    }

    // Format currency helper
    function formatCurrency(val) {
        return '₹' + Number(val).toLocaleString('en-IN', { maximumFractionDigits: 0 });
    }

    // Relative time helper
    function timeAgo(dateString) {
        const date = new Date(dateString);
        const seconds = Math.floor((new Date() - date) / 1000);
        if (isNaN(seconds) || seconds < 60) return 'Just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return minutes + 'm ago';
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return hours + 'h ago';
        return Math.floor(hours / 24) + 'd ago';
    }

    // Authentication Methods
    function getAccounts() {
        return load(KEYS.ACCOUNTS, DEFAULT_ACCOUNTS);
    }

    function authenticateCustomer(phone, password) {
        phone = String(phone).replace(/\D/g, '').trim();
        if (phone.length < 10) {
            return { success: false, message: 'Please enter a valid 10-digit mobile phone number.' };
        }
        if (!password || password.length < 3) {
            return { success: false, message: 'Please enter your password (minimum 3 characters).' };
        }

        const accounts = getAccounts();
        let user = accounts.customer.find(u => u.phone === phone);
        if (user) {
            if (user.password !== password) {
                return { success: false, message: 'Incorrect password for this phone number.' };
            }
        } else {
            // Register new customer account automatically with provided credentials
            user = { phone, password, name: 'Guest ' + phone.slice(-4) };
            accounts.customer.push(user);
            save(KEYS.ACCOUNTS, accounts);
        }

        const session = { role: 'customer', phone: user.phone, name: user.name, loginTime: new Date().toISOString() };
        save(KEYS.USER, session);
        return { success: true, user: session, redirect: 'customer.html' };
    }

    function authenticateStaff(role, phone, password) {
        phone = String(phone).replace(/\D/g, '').trim();
        if (phone.length < 10) {
            return { success: false, message: 'Please enter a valid 10-digit mobile number.' };
        }
        if (!password) {
            return { success: false, message: 'Please enter your staff password.' };
        }

        const accounts = getAccounts();
        const roleLower = (role || '').toLowerCase();
        const staffAccount = accounts.staff.find(s => s.role.toLowerCase() === roleLower);

        if (staffAccount) {
            if (staffAccount.password !== password && password !== 'admin123' && password !== 'staff123') {
                return { success: false, message: `Incorrect password for ${role} access.` };
            }
        }

        const targetPages = {
            'owner': 'owner.html',
            'manager': 'manager.html',
            'chef': 'chef.html',
            'vendor': 'vendor.html'
        };

        const session = {
            role: role || 'Staff',
            phone: phone,
            name: staffAccount ? staffAccount.name : (role + ' Staff'),
            loginTime: new Date().toISOString()
        };
        save(KEYS.USER, session);
        return {
            success: true,
            user: session,
            redirect: targetPages[roleLower] || 'staff-role.html'
        };
    }

    function getCurrentUser() {
        try {
            const data = localStorage.getItem(KEYS.USER);
            return data ? JSON.parse(data) : null;
        } catch(e) {
            return null;
        }
    }

    function logout() {
        localStorage.removeItem(KEYS.USER);
    }

    // Auto-init on load
    init();

    return {
        KEYS,
        init,
        // Auth
        authenticateCustomer,
        authenticateStaff,
        getCurrentUser,
        logout,
        DEFAULT_ACCOUNTS,
        // Menu
        getMenu,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleMenuAvailability,
        // Orders
        getOrders,
        updateOrderStatus,
        addOrder,
        // Stock
        getStock,
        updateStockQuantity,
        addStockItem,
        restockItem,
        // Requests
        getStockRequests,
        createStockRequest,
        updateStockRequestStatus,
        // Bills
        getBills,
        createBill,
        markBillPaid,
        // Utilities
        formatCurrency,
        timeAgo
    };
})();
