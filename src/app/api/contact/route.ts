import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, category, subject, message } = body;

    if (!name || !email || !category || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // When Supabase is configured, insert into contact_enquiries table:
    // const supabase = await createClient();
    // const { error } = await supabase.from("contact_enquiries").insert({
    //   name, email, phone, category, subject, message
    // });

    // For now, log and return success
    console.log("Contact form submission:", { name, email, phone, category, subject, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
