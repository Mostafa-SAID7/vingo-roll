# Docker Publishing Status Checker
# This script helps you verify the Docker publishing workflow status

param(
    [string]$DockerUsername = "YOUR_DOCKER_USERNAME",
    [string]$GitHubRepo = "Mostafa-SAID7/vingo-roll-studio",
    [string]$Version = "v1.9.4"
)

Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║         Docker Publishing Status Checker v1.0                 ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Configuration
$DockerHubAPI = "https://hub.docker.com/v2"
$GHCRRegistry = "ghcr.io"
$GitHubAPI = "https://api.github.com"

# Color helpers
function Write-Success { Write-Host "✅ $args" -ForegroundColor Green }
function Write-Error { Write-Host "❌ $args" -ForegroundColor Red }
function Write-Warning { Write-Host "⚠️  $args" -ForegroundColor Yellow }
function Write-Info { Write-Host "ℹ️  $args" -ForegroundColor Cyan }

Write-Host "Configuration:" -ForegroundColor Cyan
Write-Host "  Docker Username: $DockerUsername"
Write-Host "  GitHub Repo: $GitHubRepo"
Write-Host "  Version: $Version"
Write-Host ""

# Check 1: GitHub Actions Status
Write-Host "1. Checking GitHub Actions Workflow Status..." -ForegroundColor Magenta
Write-Host "───────────────────────────────────────────────" -ForegroundColor Gray

$githubActionURL = "https://github.com/$GitHubRepo/actions/workflows/docker-publish.yml"
Write-Info "GitHub Actions workflow: $githubActionURL"
Write-Info "📊 Check the workflow status manually (GitHub Actions is real-time)"
Write-Info "   - Look for 'Docker Publish' workflow"
Write-Info "   - Should show 2 jobs: docker-hub and ghcr"
Write-Info "   - Status: ⏳ In Progress (running) or ✅ Completed"
Write-Host ""

# Check 2: Docker Hub Repository
Write-Host "2. Checking Docker Hub Repository..." -ForegroundColor Magenta
Write-Host "───────────────────────────────────────────────" -ForegroundColor Gray

$dockerHubURL = "https://hub.docker.com/r/$DockerUsername/vingo-roll-studio"
Write-Info "Repository URL: $dockerHubURL"

try {
    # Get repository info from Docker Hub API (public, no auth needed)
    $repoResponse = Invoke-WebRequest -Uri "$DockerHubAPI/repositories/$DockerUsername/vingo-roll-studio" `
        -ErrorAction Stop -TimeoutSec 10
    
    if ($repoResponse.StatusCode -eq 200) {
        Write-Success "Repository exists on Docker Hub"
        
        # Check tags
        Write-Host ""
        Write-Info "Available tags:"
        try {
            $tagsResponse = Invoke-WebRequest -Uri "$DockerHubAPI/repositories/$DockerUsername/vingo-roll-studio/tags" `
                -ErrorAction Stop -TimeoutSec 10
            $tagsJson = $tagsResponse.Content | ConvertFrom-Json
            
            if ($tagsJson.results -and $tagsJson.results.Count -gt 0) {
                foreach ($tag in $tagsJson.results | Select-Object -First 10) {
                    Write-Host "   • $($tag.name)" -ForegroundColor Green
                }
            } else {
                Write-Warning "No tags found yet (still building?)"
            }
        } catch {
            Write-Warning "Could not fetch tags from API: $($_.Exception.Message)"
        }
    }
} catch {
    Write-Warning "Repository not found or still creating (just pushed the tag)"
    Write-Info "   This is normal if the workflow is still running"
    Write-Info "   The repository will be created automatically by Docker Hub"
    Write-Info "   Check again in 5-10 minutes"
}
Write-Host ""

# Check 3: Test Docker Pull (if Docker is installed)
Write-Host "3. Testing Docker Pull (if available)..." -ForegroundColor Magenta
Write-Host "───────────────────────────────────────────────" -ForegroundColor Gray

$dockerInstalled = $null -ne (Get-Command docker -ErrorAction SilentlyContinue)

if ($dockerInstalled) {
    Write-Success "Docker is installed"
    
    Write-Info "Attempting to pull v1.9.4 image..."
    try {
        $pullResult = & docker pull "$($DockerUsername)/vingo-roll-studio:$Version" 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Image pulled successfully!"
            Write-Info "You can now run: docker run -p 3000:3000 $DockerUsername/vingo-roll-studio:$Version"
        } else {
            Write-Warning "Pull failed (image may not be available yet)"
        }
    } catch {
        Write-Warning "Docker pull test failed: $($_.Exception.Message)"
    }
} else {
    Write-Warning "Docker CLI not installed - cannot test pull"
    Write-Info "Manual test: docker pull $DockerUsername/vingo-roll-studio:$Version"
}
Write-Host ""

# Check 4: GHCR (GitHub Container Registry)
Write-Host "4. Checking GHCR (GitHub Container Registry)..." -ForegroundColor Magenta
Write-Host "───────────────────────────────────────────────" -ForegroundColor Gray

$ghcrURL = "https://github.com/$GitHubRepo/pkgs/container/vingo-roll-studio"
Write-Info "GHCR Package URL: $ghcrURL"
Write-Info "Pull command: docker pull ghcr.io/$GitHubRepo/vingo-roll-studio:$Version"
Write-Info "ℹ️  GHCR packages are automatically created when pushed"
Write-Host ""

# Check 5: Quick Links
Write-Host "5. Quick Links & Next Steps..." -ForegroundColor Magenta
Write-Host "───────────────────────────────────────────────" -ForegroundColor Gray

Write-Host ""
Write-Host "📋 DOCUMENTATION:" -ForegroundColor Yellow
Write-Host "   • VERIFICATION_CHECKLIST.md     - Step-by-step verification guide"
Write-Host "   • DOCKER_PUBLISH_TRACKING.md    - Detailed publishing information"
Write-Host "   • DOCKER_SECRETS_SETUP.md       - Secrets configuration guide"
Write-Host "   • PUBLISHING_GUIDE.md           - Architecture & publishing options"
Write-Host ""

Write-Host "🔗 ONLINE LINKS:" -ForegroundColor Yellow
Write-Host "   • GitHub Actions:               https://github.com/$GitHubRepo/actions"
Write-Host "   • GitHub Actions (Docker):      https://github.com/$GitHubRepo/actions/workflows/docker-publish.yml"
Write-Host "   • Docker Hub Repository:        https://hub.docker.com/r/$DockerUsername/vingo-roll-studio"
Write-Host "   • GHCR Package:                 https://github.com/$GitHubRepo/pkgs/container/vingo-roll-studio"
Write-Host "   • GitHub Release:               https://github.com/$GitHubRepo/releases/tag/$Version"
Write-Host ""

Write-Host "⏱️  EXPECTED TIMELINE:" -ForegroundColor Yellow
Write-Host "   • Tag pushed:                   ✅ Done"
Write-Host "   • Workflow starts:              ~30 seconds"
Write-Host "   • Build completes:              ~5 minutes"
Write-Host "   • Images pushed:                ~7 minutes"
Write-Host "   • Tags visible on Docker Hub:   ~10 minutes"
Write-Host "   • GHCR tags visible:            ~12 minutes"
Write-Host ""

Write-Host "✅ SUCCESS CHECKLIST:" -ForegroundColor Yellow
Write-Host "   - [ ] GitHub Actions workflow completes (green checkmark)"
Write-Host "   - [ ] Docker Hub repository created"
Write-Host "   - [ ] Tags visible: v1.9.4, latest, 1.9, 1"
Write-Host "   - [ ] GHCR package shows tags"
Write-Host "   - [ ] Local docker pull succeeds"
Write-Host "   - [ ] Container runs successfully"
Write-Host ""

Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  Check back in 5-10 minutes to verify all steps completed!   ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

Write-Host "For more details, see: VERIFICATION_CHECKLIST.md" -ForegroundColor Cyan
