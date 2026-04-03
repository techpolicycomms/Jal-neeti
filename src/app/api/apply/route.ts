import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jobTitle, jobSlug, fullName, email, coverNote } = body;

    if (!fullName || !email || !coverNote) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // When Supabase is configured, insert into applications table:
    // const supabase = await createClient();
    // const { error } = await supabase.from("applications").insert({
    //   job_id: jobId, full_name: fullName, email, ...
    // });

    console.log("Application submission:", { jobTitle, jobSlug, fullName, email });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
