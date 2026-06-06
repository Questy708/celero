import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Auth verification helper
async function verifyAuth(req: NextRequest): Promise<boolean> {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) return false;

    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const [timestampStr, randomPart, hashHex] = parts;
    const timestamp = parseInt(timestampStr, 10);

    // Check if token is expired (24 hours)
    const now = Date.now();
    const maxAge = 24 * 60 * 60 * 1000;
    if (now - timestamp > maxAge) return false;

    // Recompute hash
    const secret = process.env.ADMIN_SECRET || "fallback-secret";
    const data = `${secret}:${timestampStr}:${randomPart}`;
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const recomputedHash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    return recomputedHash === hashHex;
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  // Verify auth
  const isAuthed = await verifyAuth(req);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const section = searchParams.get("section"); // subscribers, inquiries, applications, stats

    // If section is specified, return only that section
    if (section === "subscribers") {
      const subscribers = await db.subscriber.findMany({
        orderBy: { createdAt: "desc" },
        take: 500,
      });
      return NextResponse.json({ subscribers });
    }

    if (section === "inquiries") {
      const inquiries = await db.investmentInquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 500,
      });
      return NextResponse.json({ inquiries });
    }

    if (section === "applications") {
      const applications = await db.application.findMany({
        orderBy: { createdAt: "desc" },
        take: 500,
      });
      return NextResponse.json({ applications });
    }

    if (section === "stats") {
      const [
        totalSubscribers,
        totalInquiries,
        totalApplications,
        pendingInquiries,
        pendingApplications,
        totalInvestmentAmount,
        recentSubscribers,
        recentInquiries,
        recentApplications,
      ] = await Promise.all([
        db.subscriber.count(),
        db.investmentInquiry.count(),
        db.application.count(),
        db.investmentInquiry.count({ where: { status: "pending" } }),
        db.application.count({ where: { status: "pending" } }),
        db.investmentInquiry.aggregate({ _sum: { amount: true } }),
        db.subscriber.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
        db.investmentInquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
        db.application.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      ]);

      // Tier breakdown
      const inquiriesByTier = await db.investmentInquiry.groupBy({
        by: ["tier"],
        _count: { tier: true },
        _sum: { amount: true },
      });

      // Application type breakdown
      const applicationsByType = await db.application.groupBy({
        by: ["type"],
        _count: { type: true },
      });

      // Inquiry status breakdown
      const inquiriesByStatus = await db.investmentInquiry.groupBy({
        by: ["status"],
        _count: { status: true },
      });

      // Application status breakdown
      const applicationsByStatus = await db.application.groupBy({
        by: ["status"],
        _count: { status: true },
      });

      return NextResponse.json({
        totalSubscribers,
        totalInquiries,
        totalApplications,
        pendingInquiries,
        pendingApplications,
        totalInvestmentAmount: totalInvestmentAmount._sum.amount || 0,
        inquiriesByTier,
        applicationsByType,
        inquiriesByStatus,
        applicationsByStatus,
        recentSubscribers,
        recentInquiries,
        recentApplications,
      });
    }

    // Default: return all data
    const [subscribers, inquiries, applications] = await Promise.all([
      db.subscriber.findMany({ orderBy: { createdAt: "desc" }, take: 500 }),
      db.investmentInquiry.findMany({ orderBy: { createdAt: "desc" }, take: 500 }),
      db.application.findMany({ orderBy: { createdAt: "desc" }, take: 500 }),
    ]);

    return NextResponse.json({ subscribers, inquiries, applications });
  } catch (error) {
    console.error("Admin API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update status for inquiries and applications
export async function PATCH(req: NextRequest) {
  // Verify auth
  const isAuthed = await verifyAuth(req);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { model, id, status, notes } = body;

    if (!model || !id || !status) {
      return NextResponse.json(
        { error: "model, id, and status are required" },
        { status: 400 }
      );
    }

    if (model === "inquiry") {
      const validStatuses = ["pending", "reviewing", "contacted", "declined", "invested"];
      if (!validStatuses.includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }
      const inquiry = await db.investmentInquiry.update({
        where: { id },
        data: { status },
      });
      return NextResponse.json({ inquiry });
    }

    if (model === "application") {
      const validStatuses = ["pending", "reviewing", "contacted", "accepted", "declined"];
      if (!validStatuses.includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
      }
      const updateData: Record<string, unknown> = { status };
      if (notes !== undefined) updateData.notes = notes;
      const application = await db.application.update({
        where: { id },
        data: updateData,
      });
      return NextResponse.json({ application });
    }

    return NextResponse.json(
      { error: "Invalid model. Must be 'inquiry' or 'application'" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Admin update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete a record
export async function DELETE(req: NextRequest) {
  // Verify auth
  const isAuthed = await verifyAuth(req);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const model = searchParams.get("model");
    const id = searchParams.get("id");

    if (!model || !id) {
      return NextResponse.json(
        { error: "model and id are required" },
        { status: 400 }
      );
    }

    if (model === "subscriber") {
      await db.subscriber.delete({ where: { id } });
      return NextResponse.json({ message: "Subscriber deleted" });
    }

    if (model === "inquiry") {
      await db.investmentInquiry.delete({ where: { id } });
      return NextResponse.json({ message: "Inquiry deleted" });
    }

    if (model === "application") {
      await db.application.delete({ where: { id } });
      return NextResponse.json({ message: "Application deleted" });
    }

    return NextResponse.json(
      { error: "Invalid model" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Admin delete error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
