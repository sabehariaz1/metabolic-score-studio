mkdir metabolic-score-studio && cd metabolic-score-studio
git init -b main
# Create all files below, and drop voiceover.mp3 + ambient-bed.mp3 into public/
git add .
git commit -m "Initialize metabolic score studio composition and CI workflow"
gh repo create metabolic-score-studio --private --source=. --remote=origin --push