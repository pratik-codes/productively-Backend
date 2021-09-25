import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ContactUsDto } from 'src/contactus/dto/contactus.dto';
import { ContactusService } from './contactus.service';

@Controller('contactus')
@UseGuards(AuthGuard('jwt'))
export class ContactusController {
  constructor(private readonly contactusService: ContactusService) {}

  /**
   * Function that saves response for contact us forms
   * @author   Pratik Tiwari
   * @param    {contactUsDto} ContactUsDto contact us Dto -> email, name and message
   * @return   {User} returns basic response with status code and messages
   */
  @Post()
  async saveContactUsResponse(
    @Req() req,
    @Body('contactUsDto') contactUsDto: ContactUsDto,
  ): Promise<any> {
    console.log(req.user);
    return await this.contactusService.saveContactUsResponse(
      contactUsDto,
      req.user._id,
    );
  }
}
