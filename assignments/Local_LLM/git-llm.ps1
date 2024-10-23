# Step 1: Get the list of changed files using git
$changedFiles = git status --porcelain

if ($changedFiles) {
    # Step 2: Get the current date in the format you want
    $currentDateTime = Get-Date -Format "yyyy-MM-dd"

    # Step 3: Prepare the prompt for the LLM
    $prompt = @"
    Generate a commit message for the changes made on $currentDateTime based on the following modified files:
    $($changedFiles -join "`n")
    Be concise but descriptive.
"@

    # Step 4: Call the llm package to generate the commit message
    $commitMessage = llm prompt $prompt

    # Step 5: Display the generated commit message
    Write-Host "Generated Commit Message: `"$commitMessage`""
    
    # Optional: Automatically stage changes and commit (uncomment to enable)
    # git add .
    # git commit -m "$commitMessage"
} else {
    Write-Host "No changes detected in the repository."
}
