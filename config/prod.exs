use Mix.Config

config :dargobot,
  tokens: System.get_env("SLACK_TOKENS") |> String.split(",")
