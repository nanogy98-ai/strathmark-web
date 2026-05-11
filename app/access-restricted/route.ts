function forbidden(request: Request) {
  return new Response(
    request.method === "HEAD" ? null : "Access restricted.\n",
    {
      status: 403,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    }
  );
}

export {
  forbidden as DELETE,
  forbidden as GET,
  forbidden as HEAD,
  forbidden as OPTIONS,
  forbidden as PATCH,
  forbidden as POST,
  forbidden as PUT,
};
