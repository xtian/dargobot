defmodule Dargobot.Mixfile do
  use Mix.Project

  def project do
    [
      app: :dargobot,
      version: "0.1.0",
      elixir: "~> 1.3",
      name: "Dargobot",
      description: "Personal Slack companion",
      source_url: "https://github.com/xtian/dargobot",
      build_embedded: Mix.env == :prod,
      start_permanent: Mix.env == :prod,
      aliases: aliases(),
      deps: deps(),
      dialyzer: [flags: ~w(-Wunmatched_returns -Werror_handling -Wrace_conditions -Wunderspecs)]
   ]
  end

  # Configuration for the OTP application
  #
  # Type "mix help compile.app" for more information
  def application do
    [
      applications: [:logger, :slack],
      mod: {Dargobot, []}
    ]
  end

  defp aliases do
    [test: "test --no-start"]
  end

  # Dependencies can be Hex packages:
  #
  #   {:mydep, "~> 0.3.0"}
  #
  # Or git/path repositories:
  #
  #   {:mydep, git: "https://github.com/elixir-lang/mydep.git", tag: "0.1.0"}
  #
  # Type "mix help deps" for more examples and options
  defp deps do
    [
      {:credo, "~> 0.4", only: [:dev, :test]},
      {:dialyxir, "~> 0.4", only: [:dev, :test]},
      {:slack, "~> 0.9.0"}
    ]
  end
end
