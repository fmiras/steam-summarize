export function AboutSection() {
  return (
    <section className="min-h-screen w-full relative overflow-hidden bg-gradient-to-b from-background via-purple-900/20 to-blue-900/20">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />

      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">Dead simple: Steam reviews + AI summary</p>
          </div>

          <div className="grid gap-8">
            <div className="p-6 rounded-lg bg-black/40 backdrop-blur border border-white/10">
              <h3 className="text-lg font-semibold text-purple-400 mb-2">
                1. You search for a game
              </h3>
              <p className="text-gray-300">
                Enter any game title or Steam App ID in the search box
              </p>
            </div>

            <div className="p-6 rounded-lg bg-black/40 backdrop-blur border border-white/10">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                2. We fetch Steam reviews
              </h3>
              <p className="text-gray-300">
                Using Steam{"'"}s public API, we grab the most recent reviews
              </p>
            </div>

            <div className="p-6 rounded-lg bg-black/40 backdrop-blur border border-white/10">
              <h3 className="text-lg font-semibold text-cyan-400 mb-2">3. GPT-4 summarizes them</h3>
              <p className="text-gray-300">
                AI reads through the reviews and creates a quick summary
              </p>
            </div>
          </div>

          <div className="text-center text-sm text-gray-400 bg-black/20 p-4 rounded-lg backdrop-blur">
            <p>That{"'"}s literally it. No data storage. No tracking. No BS.</p>
            <p className="mt-2 text-xs">Not affiliated with Steam or Valve Corporation.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
