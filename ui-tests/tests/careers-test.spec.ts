import { test } from '@playwright/test';
import { CareersPage } from '../pages/careers.page';
import { LeverPage } from '../pages/lever.page';
import { TestData } from '../data/test-data';

test.describe('Careers - QA Job Application Flow @ui @smoke', () => {

  test('should navigate to QA jobs, filter by location, and apply successfully', async ({ page }) => {
    console.log('🧪 Starting positive QA job application test');

    const careers = new CareersPage(page);
    const lever = new LeverPage(page);

    await careers.goTo();
    
    await careers.verifyLoaded();

    await careers.navigateToQAPositions();

    await lever.filterByLocation(TestData.validLocation);

    await lever.verifyJobsList(TestData.validLocation);

    await lever.applyToJob();

    await lever.verifyApplyPageOpened();

    console.log('✅ Test completed successfully');
  });

  test('should display no results message when filtering with an invalid location', async ({ page }) => {
    console.log('🧪 Starting negative location test');

    const careers = new CareersPage(page);
    const lever = new LeverPage(page);

    await careers.goTo();

    await careers.verifyLoaded();

    await careers.navigateToQAPositions();

    await lever.filterByLocation(TestData.invalidLocation);

    await lever.verifyNoJobsFound();

    console.log('✅ Negative test completed successfully');
  });
});