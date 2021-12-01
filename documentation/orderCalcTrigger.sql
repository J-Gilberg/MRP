UPDATE order_calcs
SET xy = quantity*order_unix, xsqr = quantity*quantity, ysqr = order_unix*order_unix, xcube = xcube = quantity*quantity*quantity;


CREATE TRIGGER order_calcs_data AFTER INSERT ON orders
       FOR EACH ROW INSERT INTO order_calcs (order_date, product_id, quantity, order_day, order_week, order_month, order_year, order_unix, xy , xsqr, ysqr)
		SELECT
		order_date
		,product_id
		,SUM(quantity)
		,DAYOFYEAR(order_date)
		,WEEKOFYEAR(order_date)
		,MONTH(order_date)
		,YEAR(order_date)
		,FLOOR((UNIX_TIMESTAMP(order_date)-1262325600)/86400)
		,quantity*order_unix
		,quantity*quantity
		,order_unix*order_unix
		FROM orders
		GROUP BY order_date, product_id;


SELECT * 
FROM order_calcs o 
JOIN purchases p ON o.order_unix = p.purchase_unix
JOIN planned_purchases pp ON o.order_unix = pp.planned_purchase_unix
JOIN forecasts f ON o.order_unix = f.forecast_unix