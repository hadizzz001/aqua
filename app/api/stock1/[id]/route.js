import clientPromise from '../../../lib/mongodb'; // Adjust path as needed
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function PATCH(request) {
  const { id, color, qty } = await request.json(); // Expecting id, color, and qty in body

  console.log("id, color, qty: ", id, color, qty);
  
  try {
    const client = await clientPromise;
    const db = client.db('test');
    const collection = db.collection('Product');

    const quantityToDecrease = parseInt(qty, 10);

    if (!id || !color || isNaN(quantityToDecrease)) {
      return NextResponse.json({ error: "Missing or invalid id, color, or quantity" }, { status: 400 });
    }

    const objectId = new ObjectId(id);

    // Find the product by ID and color
    const product = await collection.findOne({ _id: objectId, "color.color": color });

    if (!product) {
      return NextResponse.json({ error: "Product with specified id and color not found" }, { status: 404 });
    }

    const colorEntry = product.color.find(c => c.color === color);

    if (!colorEntry || colorEntry.qty < quantityToDecrease) {
      return NextResponse.json({ error: "Insufficient stock for this color" }, { status: 400 });
    }

    // Update using positional $ operator
    const result = await collection.updateOne(
      { _id: objectId, "color.color": color },
      { $inc: { "color.$.qty": -quantityToDecrease } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Failed to update quantity" }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error updating color quantity:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}




 
export async function GET(request, { params }) {
const [id, color] = params.id.split(',');
console.log("productId: ", id);
console.log("color: ", color);


  try {
    const client = await clientPromise;
    const db = client.db("test");
    const collection = db.collection("Product");

    // Find a product that has the specified color in the color array
    const product = await collection.findOne(
      { "color.color": color }, // matches color inside array of objects
      { projection: { color: 1 } } // only return the color field
    );

    console.log("product: ", product);
    

    if (!product) {
      return NextResponse.json({ error: "Color not found" }, { status: 404 });
    }

    // Find the exact color entry
    const colorEntry = product.color.find(entry => entry.color === color);

    if (!colorEntry) {
      return NextResponse.json({ error: "Color not available" }, { status: 404 });
    }

    return NextResponse.json({ qty: colorEntry.qty }, { status: 200 });

  } catch (error) {
    console.error("Error fetching color quantity:", error);
    return NextResponse.json({ error: "Failed to fetch quantity" }, { status: 500 });
  }
}

